import React from 'react';
import InputMask from 'react-input-mask';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface MaskedInputProps {
  name: string;
  label: string;
  mask: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function MaskedInput({
  value,
  onChange,
  name,
  mask,
  label,
  disabled,
  ...rest
}: MaskedInputProps & Omit<TextFieldProps, 'onChange'>) {
  return (
    <InputMask
      mask={mask}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {() => (
        <TextField
          label={label}
          variant="outlined"
          value={value}
          disabled={disabled}
          {...rest}
        />
      )}
    </InputMask>
  );
}

export default MaskedInput;
