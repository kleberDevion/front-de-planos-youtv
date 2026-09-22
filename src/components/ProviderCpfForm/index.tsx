import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import MaskedInput from '../../styles/MaskedInput';
import { Provider } from '../../infra/services/types';
import { isValidCpf } from '../../utils/cpf';

export interface ProviderCpfValue {
  providerId: string;
  /** CPF com máscara, como aparece no campo. */
  cpf: string;
}

interface ProviderCpfFormProps {
  providers: Provider[];
  providersLoading: boolean;
  value: ProviderCpfValue;
  onChange: (value: ProviderCpfValue) => void;
  submitLabel: string;
  loading: boolean;
  onSubmit: () => void;
}

const Form = styled.form`
  display: grid;
  gap: 20px;

  .submitButton {
    height: 56px;
  }
`;

function ProviderCpfForm({
  providers,
  providersLoading,
  value,
  onChange,
  submitLabel,
  loading,
  onSubmit,
}: ProviderCpfFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const providerError = submitted && !value.providerId;
  const cpfError = submitted && !isValidCpf(value.cpf);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (!value.providerId || !isValidCpf(value.cpf)) return;
    onSubmit();
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <TextField
        select
        label="Qual é o seu provedor?"
        value={value.providerId}
        onChange={(event) => onChange({ ...value, providerId: event.target.value })}
        disabled={loading || providersLoading}
        error={providerError}
        helperText={
          (providersLoading && 'Carregando provedores...') ||
          (providerError && 'Selecione o seu provedor.') ||
          ' '
        }
        fullWidth
      >
        {providers.map((provider) => (
          <MenuItem key={provider.id} value={provider.id}>
            {provider.name}
          </MenuItem>
        ))}
      </TextField>

      <MaskedInput
        name="cpf"
        label="CPF"
        mask="999.999.999-99"
        value={value.cpf}
        onChange={(event) => onChange({ ...value, cpf: event.target.value })}
        disabled={loading}
        error={cpfError}
        helperText={cpfError ? 'Informe um CPF válido.' : ' '}
        inputProps={{ inputMode: 'numeric' }}
        fullWidth
      />

      <Button
        type="submit"
        size="large"
        variant="contained"
        className="submitButton"
        disabled={loading || providersLoading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
      >
        {loading ? 'Aguarde...' : submitLabel}
      </Button>
    </Form>
  );
}

export default ProviderCpfForm;
