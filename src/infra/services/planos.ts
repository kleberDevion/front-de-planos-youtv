import { api } from './api';
import { sanitizeCpf } from '../../utils/cpf';

export async function requestTrial(provedor: string, cpf: string) {
  const response = await api.post('', { provedor, cpf: sanitizeCpf(cpf) });
  return response.data;
}

export async function requestActivePlan(provedor: string, cpf: string) {
  const response = await api.post('', { provedor, cpf: sanitizeCpf(cpf) });
  return response.data;
}
