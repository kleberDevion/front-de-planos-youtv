/**
 * Respostas simuladas usadas enquanto as rotas da API estão vazias. Nada aqui acessa a rede.
 * - Teste: cada CPF consegue o teste uma vez. A segunda tentativa volta como indisponível.
 * - Plano: CPF que pediu o teste fica no Premium. Nos outros, o último dígito decide:
 *   0 a 3 Premium, 4 a 6 Básico, 7 a 9 nenhum plano.
 * Tudo fica na memória do navegador e some ao recarregar a página.
 */
import { ClientQuery, PlanType, Provider, TrialResult } from './types';

const DELAY_MS = 700;

const trials = new Set<string>();

function wait<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), DELAY_MS);
  });
}

export function listProviders(): Promise<Provider[]> {
  return wait([{ id: 'megalink', name: 'Megalink' }]);
}

export function requestTrial({ cpf }: ClientQuery): Promise<TrialResult> {
  if (trials.has(cpf)) return wait<TrialResult>('indisponivel');
  trials.add(cpf);
  return wait<TrialResult>('liberado');
}

export function getActivePlan({ cpf }: ClientQuery): Promise<PlanType | null> {
  if (trials.has(cpf)) return wait<PlanType | null>('premium');
  const lastDigit = Number(cpf[cpf.length - 1]);
  if (lastDigit <= 3) return wait<PlanType | null>('premium');
  if (lastDigit <= 6) return wait<PlanType | null>('basico');
  return wait<PlanType | null>(null);
}
