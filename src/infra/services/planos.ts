/**
 * Services das duas abas.
 * As rotas estão vazias até o back-end defini-las. Com a rota vazia, a função devolve a resposta
 * simulada e nenhuma requisição é feita. Com a rota preenchida, a chamada passa a usar o axios.
 * O formato das respostas deve ser ajustado quando as regras do back-end chegarem.
 */
import { api } from './api';
import * as simulacao from './simulacao';
import { ClientQuery, PlanType, Provider, TrialResult } from './types';

/** Duração do teste do pacote completo do YouTV Premium. */
export const TRIAL_DAYS = 15;

const ROTAS = {
  provedores: '',
  teste: '',
  plano: '',
};

export async function listProviders(): Promise<Provider[]> {
  if (!ROTAS.provedores) return simulacao.listProviders();
  const { data } = await api.get<Provider[]>(ROTAS.provedores);
  return data;
}

export async function requestTrial(query: ClientQuery): Promise<TrialResult> {
  if (!ROTAS.teste) return simulacao.requestTrial(query);
  const { data } = await api.post<TrialResult>(ROTAS.teste, query);
  return data;
}

export async function getActivePlan(query: ClientQuery): Promise<PlanType | null> {
  if (!ROTAS.plano) return simulacao.getActivePlan(query);
  const { data } = await api.post<PlanType | null>(ROTAS.plano, query);
  return data;
}
