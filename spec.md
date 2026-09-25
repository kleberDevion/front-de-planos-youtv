# URIs e contratos JSON

Este documento diz o que o front envia, o que ele precisa receber de volta e onde as URLs entram no código. As URIs e os campos abaixo são uma proposta: se o back-end usar outros nomes, basta trocar as strings indicadas e o front continua funcionando.

O front não tem nenhuma regra de negócio. Ele coleta provedor e CPF, chama a API e mostra na tela a mensagem que a API devolver.

## Onde as URLs entram no front

| O que | Onde | Como está hoje |
|---|---|---|
| Endereço da API | variável `NEXT_PUBLIC_HOST_API`, lida em `src/infra/services/api.ts` | vazia |
| Caminho das duas chamadas | `src/infra/services/planos.ts` | vazio |

Para ligar o front na API, crie um arquivo `.env.local` na raiz:

```bash
NEXT_PUBLIC_HOST_API=https://api.exemplo.com.br/
```

E preencha os dois caminhos em `src/infra/services/planos.ts`:

```ts
const response = await api.post('youtv/teste', { provedor, cpf: sanitizeCpf(cpf) });
```

```ts
const response = await api.post('youtv/plano', { provedor, cpf: sanitizeCpf(cpf) });
```

## Regras de formato

- **Método e formato.** POST com corpo JSON e resposta JSON nas duas chamadas.
- **Campo `provedor`.** Texto em minúsculas, um dos valores da lista em `src/components/ProviderCpfForm/providers.ts`: `megalink`, `amigalink`, `supernet`, `vixnet`, `nortlink`.
- **Campo `cpf`.** Onze dígitos, sem ponto e sem traço. O front já remove a máscara antes de enviar.
- **Campo `message`.** Toda resposta, de sucesso ou de erro, precisa trazer `message` com o texto que o cliente deve ler. É esse texto que aparece na tela. Outros campos podem vir junto e o front ignora.
- **Autenticação.** Hoje o front não envia token. Se a API exigir, o cabeçalho `Authorization: Bearer <token>` entra em `src/infra/services/planos.ts`, no mesmo padrão da central-mksolutions.
- **CORS.** A origem do front precisa estar liberada na API.

## URIs propostas

| Ação | Método | URI | Aba |
|---|---|---|---|
| Solicitar o teste do YouTV Premium | POST | `/youtv/teste` | Solicitar teste |
| Consultar o plano ativo | POST | `/youtv/plano` | Plano ativo |

## Contrato: solicitar teste

Pedido:

```json
{
  "provedor": "megalink",
  "cpf": "12345678909"
}
```

Respostas:

| Situação | HTTP | Corpo |
|---|---|---|
| Teste liberado | 200 | `{ "message": "Teste liberado. Você tem 15 dias de YouTV Premium." }` |
| Cliente já testou antes | 409 | `{ "message": "O teste não está disponível para este usuário." }` |
| CPF não é cliente do provedor | 404 | `{ "message": "Não encontramos este CPF no provedor selecionado." }` |

O front mostra o `message` em qualquer um dos três casos. O texto do segundo caso foi pedido assim na reunião.

Campos extras são bem-vindos e opcionais, por exemplo `status` e `expiraEm`, para uso futuro.

Regras que ficam no back-end:

- O teste é do pacote completo do YouTV Premium, por 15 dias.
- O back registra que aquele cliente já testou.
- Quem já testou não pode pedir de novo. Nesse caso só contratando.

## Contrato: consultar plano ativo

Pedido:

```json
{
  "provedor": "megalink",
  "cpf": "12345678909"
}
```

Respostas:

| Situação | HTTP | Corpo |
|---|---|---|
| Tem plano ativo | 200 | `{ "message": "Você tem o plano YouTV Premium ativo." }` |
| Não tem plano | 200 | `{ "message": "Não encontramos plano do YouTV ativo para este CPF." }` |
| CPF não é cliente do provedor | 404 | `{ "message": "Não encontramos este CPF no provedor selecionado." }` |

O nome do plano vai dentro do `message`, porque é o texto que o cliente lê.

Regras que ficam no back-end:

- Procura o cadastro do cliente no YouTV.
- Se não achar, procura no provedor, no MK ERP, se ele tem internet ativa ou plano de YouTV.
- Se o provedor tem YouTV Premium ativo e o YouTV não, o back altera automaticamente.
- Se o cliente tem contrato com o provedor mas não tem Premium, ele tem direito ao plano básico, e o back cadastra nesse plano.

## Erros

- **Erro tratado.** Responda com o HTTP adequado e `{ "message": "..." }`. O front mostra essa mensagem.
- **Erro sem mensagem ou falha de rede.** O front mostra um texto padrão dele, como "Não foi possível consultar o plano. Tente novamente."

## Como testar antes de ligar o front

```bash
curl -X POST https://api.exemplo.com.br/youtv/teste \
  -H 'Content-Type: application/json' \
  -d '{"provedor":"megalink","cpf":"12345678909"}'

curl -X POST https://api.exemplo.com.br/youtv/plano \
  -H 'Content-Type: application/json' \
  -d '{"provedor":"megalink","cpf":"12345678909"}'
```

Com as duas chamadas respondendo `message`, o front funciona sem nenhuma outra mudança.
