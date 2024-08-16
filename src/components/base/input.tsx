import { FieldInput } from '@/types/form';
import { ErrorMessage } from "@hookform/error-message"

const Input = <T extends Record<string, unknown>>({
  name,
  label,
  type,
  placeholder,
  required,
  value,
  onChange,
  errors,
  ...props
}: FieldInput<T>) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        {...props}
      />
      <ErrorMessage errors={errors} name={name} />
      </>
  );
};

export default Input;
