import React from 'react';
import NumberFormat, { NumberFormatPropsBase } from 'react-number-format';

interface CurrencyInputProps extends Omit<NumberFormatPropsBase<string>, 'onValueChange' | 'value'> {
  value?: string | number;
  onChange?: (value: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <NumberFormat
      value={value}
      onValueChange={(values) => onChange?.(values.value)}
      thousandSeparator={true}
      prefix={'$'}
      {...props}
    />
  );
};

export default CurrencyInput;
