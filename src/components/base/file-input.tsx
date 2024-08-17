import React, { InputHTMLAttributes } from 'react';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: string | null;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  errors,
  ...props
}) => {
  return (
    <div>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input type="file" {...props} />
      {errors && <p style={{ color: 'red' }}>{errors}</p>}
    </div>
  );
};

export default FileInput;
