import React, { InputHTMLAttributes } from 'react';
import { FieldErrors, FieldValues, FieldName } from 'react-hook-form';
import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import { Option } from '@/types/form';

// Define the generic props for the CheckboxInput component
interface CheckboxInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>;
  errors?: FieldErrors<T>;
  options: Option[];
  value?: string[]; 
  required?: boolean;
}

const CheckboxInput = <T extends FieldValues>({
  label,
  errors,
  name,
  options,
  value = [], 
  required,
  ...props
}: CheckboxInputProps<T>) => {
  // Ensure value is always treated as an array
  const selectedValues = Array.isArray(value) ? value : [];

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
              checked={value.includes(option.value)}
              onChange={(e) => {
                const { checked, value: checkboxValue } = e.target;
                const updatedValue = checked
                  ? [...value, checkboxValue]
                  : value.filter((v) => v !== checkboxValue);
        
                // Create a new event with updated values
                const newEvent = {
                  ...e,
                  target: {
                    ...e.target,
                    value: updatedValue,
                  },
                };
        
                // Call the onChange prop with the new event
                props.onChange(newEvent);
              }}
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
