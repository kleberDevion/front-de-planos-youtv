# Front de planos YouTV

Página com duas abas:

- **Solicitar teste:** o cliente escolhe o provedor, informa o CPF e pede o teste de 15 dias do pacote completo do YouTV Premium. Quem já usou o teste vê "O teste não está disponível para este usuário".
- **Plano ativo:** com o mesmo formulário, mostra qual plano do YouTV está ativo para o CPF.

## Stack

A mesma da branch developer da central-mksolutions: Next 11.1.2, React 17, TypeScript 4.9.5, MUI 5, styled-components 5 e axios 0.24, com yarn e Node 16.

## Como rodar

```bash
nvm use            # usa o Node 16 do .nvmrc
yarn install --frozen-lockfile
yarn dev           # http://localhost:3003
```

O Next 11 não roda no Node 17 ou mais novo sem ajustes, por isso o Node 16.

## Services e back-end

As chamadas ficam em `src/infra/services/planos.ts`, com o axios de `src/infra/services/api.ts`. Nenhuma URL ou rota está definida no front. Elas entram quando o back-end estiver pronto.

O que o front envia, o que ele espera receber e onde preencher as URLs está em [spec.md](spec.md).

## Marca

As cores e as fontes seguem a YouTV Digital: verde `#7DC523` e amarelo `#F7F300` do logo, fundo escuro, Montserrat nos títulos e Open Sans no texto. O logo e o ícone em `public/` vieram do site oficial e devem ser trocados pelos arquivos originais da marca, se a empresa tiver.
