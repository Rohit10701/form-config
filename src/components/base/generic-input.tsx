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
      <label id={name} htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        aria-labelledby={name}
        aria-roledescription={`input field for ${name}`}
        {...props}
      />
      <ErrorMessage errors={errors} name={name} />
      </>
  );
};

export default GenericInput;
