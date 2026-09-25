import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import MaskedInput from '../../styles/MaskedInput';
import { sanitizeCpf } from '../../utils/cpf';
import { PROVIDERS } from './providers';

export interface ProviderCpfValue {
  provider: string;
  /** CPF com máscara, como aparece no campo. */
  cpf: string;
}

interface ProviderCpfFormProps {
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
  value,
  onChange,
  submitLabel,
  loading,
  onSubmit,
}: ProviderCpfFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const cpfFilled = sanitizeCpf(value.cpf).length === 11;
  const providerError = submitted && !value.provider;
  const cpfError = submitted && !cpfFilled;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (!value.provider || !cpfFilled) return;
    onSubmit();
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <TextField
        select
        label="Qual é o seu provedor?"
        value={value.provider}
        onChange={(event) =>
          onChange({ ...value, provider: event.target.value })
        }
        disabled={loading}
        error={providerError}
        helperText={providerError ? 'Selecione o seu provedor.' : ' '}
        fullWidth
      >
        {PROVIDERS.map((provider) => (
          <MenuItem key={provider} value={provider}>
            {provider}
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
        helperText={cpfError ? 'Preencha o CPF.' : ' '}
        inputProps={{ inputMode: 'numeric' }}
        fullWidth
      />

      <Button
        type="submit"
        size="large"
        variant="contained"
        className="submitButton"
        disabled={loading}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : undefined
        }
      >
        {loading ? 'Aguarde...' : submitLabel}
      </Button>
    </Form>
  );
}

export default ProviderCpfForm;
