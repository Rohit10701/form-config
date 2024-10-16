import { cn } from '@/utils/helpers';
import React from 'react';
import PhoneInput, { CountryData, PhoneInputProps } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneNumberInputProps extends Omit<PhoneInputProps, 'onChange'> {
  value?: string;
  onChange?: (value: unknown) => void;
  inputStyle?: React.CSSProperties;
  dropdownStyle?:React.CSSProperties;
  buttonStyle?:React.CSSProperties;
  containerStyle?:React.CSSProperties;
  label?: string;
  errors?: Record<string, unknown>;
  searchStyle?:React.CSSProperties;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange,searchStyle, inputStyle,containerStyle, dropdownStyle, buttonStyle, label, errors, ...props }) => {
  return (
    <div className="mb-6">
      {label && (
        <label className={cn("block mb-2 text-sm font-medium text-gray-900 dark:text-white")} htmlFor="phone-input">
          {label}
        </label>
      )}
      <PhoneInput
        country={'us'}
        value={value}
        onChange={(phone: string, country: CountryData) => {
          const reducedPhone = phone.replace(country.dialCode, '');
          onChange?.(country.dialCode + '-' + reducedPhone);
        }}
        inputStyle={{
		  margin: '0px',
          height: '40px',
          width: '100%',
          padding: '0.625rem',
		  paddingLeft: "3rem",
          ...inputStyle,
        }}
        buttonStyle={{
          backgroundColor: '#E5E7EB',
          borderTopLeftRadius: '0.375rem',
          borderBottomLeftRadius: '0.375rem',
		  ...buttonStyle
        }}
        dropdownStyle={{
          backgroundColor: '#F9FAFB',
          border: '1px solid #D1D5DB',
		  ...dropdownStyle
        }}
        {...props}
      />
      {errors && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400" id="phone-input-error">
          {errors['phone-input'] as string}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
