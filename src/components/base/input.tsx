import React, { ReactNode } from 'react';
import { FieldInput, FieldType } from '@/types/form';

const Input = <T extends Record<string, unknown>>({
  name,
  label,
  type,
  placeholder,
  required,
  defaultValue,
  dependency,
  ...props
}: FieldInput<T>) => {
  return (
    <>
      <label>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        {...props}
      />
    </>
  );
};

export default Input;
