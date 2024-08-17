import React from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneNumberInputProps extends Omit<PhoneInputProps, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <PhoneInput
      country={'us'}
      value={value}
      onChange={(phone) => onChange?.(phone)}
      {...props}
    />
  );
};

export default PhoneNumberInput;
