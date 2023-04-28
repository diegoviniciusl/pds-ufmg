import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import phoneTextFieldService from './services/phone-text-field-service';
import CustomMaskedInput from '../custom-masked-input/custom-masked-input';

type Props = Omit<TextFieldProps, 'onChange'> & { onChange: (phone: string | null) => void };

const PhoneTextField = React.forwardRef<HTMLInputElement, Props>(({ onChange, ...otherProps }, ref) => {
  const handlePhoneChange = (phone: string) => {
    onChange(phoneTextFieldService.getStandarizedPhone(phone));
  };

  return (
    <TextField
      inputRef={ref}
      InputProps={{
        inputComponent: CustomMaskedInput as any,
        inputProps: {
          mask: '(00) 00000-0000',
        },
      }}
      {...otherProps}
      onChange={(event) => handlePhoneChange(event.target.value)}
      name="phone-format"
      id="phone-masked-text-field"
    />
  );
});

export default PhoneTextField;
