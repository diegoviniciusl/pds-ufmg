import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import trialNumberTextFieldService from './services/trial-number-text-field-service';
import CustomMaskedInput from '../custom-masked-input/custom-masked-input';

type Props = Omit<TextFieldProps, 'onChange'> & { onChange: (trialNumber: string | null) => void };

const TrialNumberTextField = React.forwardRef<HTMLInputElement, Props>(({ onChange, ...otherProps }, ref) => {
  const handleTrialNumberChange = (trialNumber: string) => {
    onChange(trialNumberTextFieldService.getStandartizedTrialNumber(trialNumber));
  };

  return (
    <TextField
      inputRef={ref}
      InputProps={{
        inputComponent: CustomMaskedInput as any,
        inputProps: {
          mask: '0000000-00.0000.0.00.0000',
        },
      }}
      {...otherProps}
      onChange={(event) => handleTrialNumberChange(event.target.value)}
      name="trial-number-format"
      id="trial-number-masked-text-field"
    />
  );
});

export default TrialNumberTextField;
