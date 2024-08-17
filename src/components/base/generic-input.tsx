import { FieldInput } from '@/types/form';
import { ErrorMessage } from "@hookform/error-message"

const GenericInput = <T extends Record<string, unknown>>({
  name,
  label,
  errors,
  ...props
}: FieldInput<T>) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        {...props}
      />
      <ErrorMessage errors={errors} name={name} />
      </>
  );
};

export default GenericInput;
