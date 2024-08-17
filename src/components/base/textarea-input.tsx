import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import React, { TextareaHTMLAttributes } from 'react';
import { FieldErrors, FieldName } from 'react-hook-form';

interface TextareaInputProps<T> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name : FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>
  errors?:  FieldErrors<T>;
}

const TextareaInput = <T,>({
  label,
  errors,
  name,
  ...props
}: TextareaInputProps<T>) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea {...props}></textarea>
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};

export default TextareaInput;
