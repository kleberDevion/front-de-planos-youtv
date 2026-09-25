import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import ProviderCpfForm, { ProviderCpfValue } from '../ProviderCpfForm';
import { TabContent } from '../../styles/global-styles';
import { requestTrial } from '../../infra/services/planos';

function TrialTab() {
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
      const data = await requestTrial(form.provider, form.cpf);
      setMessage(data?.message || '');
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          'Não foi possível solicitar o teste. Tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <TabContent>
      <h2>Teste do YouTV Premium</h2>
      <p>Solicite o teste de 15 dias do pacote completo do YouTV Premium.</p>

      <ProviderCpfForm
        value={form}
        onChange={handleChange}
        submitLabel="Solicitar teste"
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

export default TrialTab;
