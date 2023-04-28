import React, { useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import taxNumberTextFieldService from './services/tax-number-text-field-service';
import CustomMaskedInput from '../custom-masked-input/custom-masked-input';
import { CPF_LENGTH } from '../../utils/constants';

type Props = Omit<TextFieldProps, 'onChange'> & { onChange: (phone: string | null) => void };

const TaxNumberTextField = React.forwardRef<HTMLInputElement, Props>(({ onChange, ...otherProps }, ref) => {
  const cpfMask = '000.000.000-000';
  const cnpjMask = '00.000.000/0000-00';

  const [mask, setMask] = useState<string>(cpfMask);

  const handleTaxNumberChange = (taxNumber: string) => {
    const standarizedTaxNumer = taxNumberTextFieldService.getStandarizedTaxNumber(taxNumber);

    if (!standarizedTaxNumer || standarizedTaxNumer.length <= CPF_LENGTH) setMask(cpfMask);
    else setMask(cnpjMask);

    onChange(standarizedTaxNumer);
  };

  return (
    <TextField
      inputRef={ref}
      InputProps={{
        inputComponent: CustomMaskedInput as any,
        inputProps: {
          mask,
        },
      }}
      {...otherProps}
      onChange={(event) => handleTaxNumberChange(event.target.value)}
      name="tax-number-format"
      id="tax-number-masked-text-field"
    />
  );
});

export default TaxNumberTextField;
