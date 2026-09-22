import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ProviderCpfForm, { ProviderCpfValue } from '../ProviderCpfForm';
import { TabContent } from '../../styles/global-styles';
import { getActivePlan } from '../../infra/services/planos';
import { PlanType, Provider } from '../../infra/services/types';
import { onlyDigits } from '../../utils/cpf';

const PLAN_NAMES: Record<PlanType, string> = {
  premium: 'YouTV Premium',
  basico: 'YouTV Básico',
};

interface PlanTabProps {
  providers: Provider[];
  providersLoading: boolean;
  form: ProviderCpfValue;
  onFormChange: (value: ProviderCpfValue) => void;
}

function PlanTab({ providers, providersLoading, form, onFormChange }: PlanTabProps) {
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [error, setError] = useState(false);

  function handleChange(value: ProviderCpfValue) {
    setSearched(false);
    setError(false);
    onFormChange(value);
  }

  async function handleSubmit() {
    setLoading(true);
    setSearched(false);
    setError(false);
    try {
      setPlan(await getActivePlan({ providerId: form.providerId, cpf: onlyDigits(form.cpf) }));
      setSearched(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TabContent>
      <h2>Plano ativo</h2>
      <p>Consulte qual plano do YouTV está ativo para o cliente.</p>

      <ProviderCpfForm
        providers={providers}
        providersLoading={providersLoading}
        value={form}
        onChange={handleChange}
        submitLabel="Consultar plano"
        loading={loading}
        onSubmit={handleSubmit}
      />

      {searched && plan && (
        <Alert severity="success" sx={{ mt: 3 }}>
          <AlertTitle>Plano {PLAN_NAMES[plan]}</AlertTitle>
          Você tem o plano {PLAN_NAMES[plan]} ativo.
        </Alert>
      )}

      {searched && !plan && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <AlertTitle>Nenhum plano ativo</AlertTitle>
          Não foi encontrado plano do YouTV ativo para este CPF.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          Não foi possível consultar o plano. Tente novamente.
        </Alert>
      )}
    </TabContent>
  );
}

export default PlanTab;
