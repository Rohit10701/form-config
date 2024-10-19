import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import React, { SelectHTMLAttributes } from 'react';
import { FieldErrors, FieldName } from 'react-hook-form';
import { cn } from '@/utils/helpers'; 

interface SelectInputProps<T> extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder: string;
  label?: string;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>;
  options: { value: string; label: string }[];
  errors?: FieldErrors<T>;
}

const SelectInput = <T,>({
  name,
  label,
  options,
  errors,
  placeholder,
  className,
  ...props
}: SelectInputProps<T>) => {
 
  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className={cn("block mb-2 text-sm font-medium text-gray-900 dark:text-white")}>
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className={cn("bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white", className)}
        {...props}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && <ErrorMessage errors={errors} name={name}/>}
    </div>
  );
};

export default SelectInput;
