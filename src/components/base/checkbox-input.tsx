import React, { InputHTMLAttributes } from 'react';
import { FieldErrors, FieldValues, FieldName } from 'react-hook-form';
import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import { Option } from '@/types/form';

// Define the generic props for the CheckboxInput component
interface CheckboxInputProps<T extends FieldValues> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>;
  errors?: FieldErrors<T>;
  options: Option[];
  value?: string[];
  required?: boolean;
  onChange: (value: string[]) => void; // Explicitly define onChange prop
}

const CheckboxInput = <T extends FieldValues>({
  label,
  errors,
  name,
  options,
  value = [],
  required,
  onChange,
  ...props
}: CheckboxInputProps<T>) => {
  const selectedValues = Array.isArray(value) ? value : [];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value: checkboxValue } = e.target;
    const updatedValue = checked
      ? [...selectedValues, checkboxValue]
      : selectedValues.filter((v) => v !== checkboxValue);

    onChange(updatedValue); 
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <div>
        {options.map((option) => (
          <div key={option.value}>
            <input
              type="checkbox"
              id={option.value}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={handleCheckboxChange}
              {...props}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
      {errors && <ErrorMessage errors={errors} name={name} />}
    </div>
  );
};

export default CheckboxInput;
