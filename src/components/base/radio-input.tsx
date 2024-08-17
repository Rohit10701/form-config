import { Option } from '@/types/form';
import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import React, { InputHTMLAttributes } from 'react';
import { FieldErrors, FieldValues, FieldName } from 'react-hook-form';

interface RadioInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>;
  errors?: FieldErrors<T>;
  options: Option[];
  value?: string;
  required?: boolean;
}

const RadioInput = <T extends FieldValues>({
  label,
  errors,
  name,
  options,
  value,
  required,
  ...props
}: RadioInputProps<T>) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <div>
        {options.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              id={option.value}
              value={option.value}
              name={name}
              checked={value === option.value}
              required={required}
              {...props}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};

export default RadioInput;
