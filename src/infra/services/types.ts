export interface Provider {
  id: string;
  name: string;
}

export interface ClientQuery {
  providerId: string;
  /** CPF só com números. */
  cpf: string;
}

/** "indisponivel" quando o cliente já usou o pacote completo e só pode contratar. */
export type TrialResult = 'liberado' | 'indisponivel';

export type PlanType = 'premium' | 'basico';
