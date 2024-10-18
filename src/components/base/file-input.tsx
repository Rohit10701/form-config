import React, { InputHTMLAttributes, useState, useEffect } from 'react';
import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import { FieldErrors, FieldName } from 'react-hook-form';

interface FileInputProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>
  errors?: FieldErrors<T>;
  mode?: 'priority' | 'lazy';
  onUpload?: (file: File) => Promise<string>;
  allowedExtensions?: string[];
  value?: string | null;
  onDelete?: () => void;
}

const FileInput = <T,>({
  label,
  name,
  errors,
  mode = 'lazy',
  onUpload,
  allowedExtensions = [],
  value,
  onDelete,
  ...props
}: FileInputProps<T>) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(value);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setPreviewUrl(value);
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile && !isFileExtensionAllowed(selectedFile)) {
      console.error(`Unsupported file type. Allowed types: ${allowedExtensions.join(', ')}`);
      return;
    }

    setFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      if (mode === 'priority' && onUpload) {
        try {
          await onUpload(selectedFile);
        } catch (error) {
          console.error('Error during priority upload:', error);
        }
      }
    }
  };

  const isFileExtensionAllowed = (file: File) => {
    if (allowedExtensions.length === 0) return true; // Allow all if no specific extensions are defined
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return fileExtension ? allowedExtensions.includes(fileExtension) : false;
  };

  const handleDelete = () => {
    setFile(null);
    setPreviewUrl(null); // Clear preview URL when deleted
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <button type="button" onClick={handleDelete}>Remove</button>
          </div>
        )}
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          {...props}
        />
      </div>
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};

export default FileInput;
