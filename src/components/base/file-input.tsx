import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import React, { InputHTMLAttributes } from 'react';
import { FieldErrors, FieldName } from 'react-hook-form';

interface FileInputProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name : FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>
  errors?:  FieldErrors<T>;}

const FileInput =  <T, >({
  label,
  name,
  errors,
  ...props
}: FileInputProps<T>) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input type="file" {...props} />
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};

export default FileInput;
