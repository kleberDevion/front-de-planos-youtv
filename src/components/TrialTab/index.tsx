import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ProviderCpfForm, { ProviderCpfValue } from '../ProviderCpfForm';
import { TabContent } from '../../styles/global-styles';
import { requestTrial, TRIAL_DAYS } from '../../infra/services/planos';
import { Provider, TrialResult } from '../../infra/services/types';
import { onlyDigits } from '../../utils/cpf';

interface TrialTabProps {
  providers: Provider[];
  providersLoading: boolean;
  form: ProviderCpfValue;
  onFormChange: (value: ProviderCpfValue) => void;
}

function TrialTab({ providers, providersLoading, form, onFormChange }: TrialTabProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrialResult | null>(null);
  const [error, setError] = useState(false);

  function handleChange(value: ProviderCpfValue) {
    setResult(null);
    setError(false);
    onFormChange(value);
  }

  async function handleSubmit() {
    setLoading(true);
    setResult(null);
    setError(false);
    try {
      setResult(await requestTrial({ providerId: form.providerId, cpf: onlyDigits(form.cpf) }));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <TabContent>
      <h2>Teste do YouTV Premium</h2>
      <p>
        Solicite o teste de {TRIAL_DAYS} dias do pacote completo do YouTV Premium. O teste só pode
        ser feito uma vez.
      </p>

      <ProviderCpfForm
        providers={providers}
        providersLoading={providersLoading}
        value={form}
        onChange={handleChange}
        submitLabel="Solicitar teste"
        loading={loading}
        onSubmit={handleSubmit}
      />

      {result === 'liberado' && (
        <Alert severity="success" sx={{ mt: 3 }}>
          <AlertTitle>Teste liberado</AlertTitle>
          Você tem {TRIAL_DAYS} dias para usar o pacote completo do YouTV Premium.
        </Alert>
      )}

      {result === 'indisponivel' && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          <AlertTitle>O teste não está disponível para este usuário</AlertTitle>
          Este cliente já usou o teste do YouTV Premium. Para ter o pacote completo, é preciso
          contratar o plano.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          Não foi possível solicitar o teste. Tente novamente.
        </Alert>
      )}
    </TabContent>
  );
}

export default TrialTab;
