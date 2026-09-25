import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import ProviderCpfForm, { ProviderCpfValue } from '../ProviderCpfForm';
import { TabContent } from '../../styles/global-styles';
import { requestActivePlan } from '../../infra/services/planos';

function PlanTab() {
  const [form, setForm] = useState<ProviderCpfValue>({
    provider: '',
    cpf: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleChange(value: ProviderCpfValue) {
    setMessage('');
    setError('');
    setForm(value);
  }

  async function handleSubmit() {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const data = await requestActivePlan(form.provider, form.cpf);
      setMessage(data?.message || '');
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          'Não foi possível consultar o plano. Tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <TabContent>
      <h2>Plano ativo</h2>
      <p>Consulte qual plano do YouTV está ativo para o cliente.</p>

      <ProviderCpfForm
        value={form}
        onChange={handleChange}
        submitLabel="Consultar plano"
        loading={loading}
        onSubmit={handleSubmit}
      />

      {message && (
        <Alert severity="info" sx={{ mt: 3 }}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
    </TabContent>
  );
}

export default PlanTab;
