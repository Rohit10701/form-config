import { FieldInput } from '@/types/form';

const Input = <T extends Record<string, unknown>>({
  name,
  label,
  type,
  placeholder,
  required,
  value = "",
  onChange,
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
    </>
  );
};

export default Input;
