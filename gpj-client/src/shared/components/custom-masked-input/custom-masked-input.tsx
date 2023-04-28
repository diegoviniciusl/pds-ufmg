import React from 'react';
import { IMaskInput } from 'react-imask';

interface Props {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
  thousandsSeparator?: string;
  radix?: string;
  scale?: number;
  signed?: boolean;
  normalizeZeros?: boolean;
  padFractionalZeros?: boolean;
}

const CustomMaskedInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { onChange, mask, ...otherProps } = props;

  return (
    <IMaskInput
      {...otherProps}
      mask={mask}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default CustomMaskedInput;
