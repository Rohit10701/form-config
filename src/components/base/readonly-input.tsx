import { FieldInput } from '@/types/form';
import { ErrorMessage } from "@hookform/error-message"

const ReadOnlyInput = <T extends Record<string, unknown>>({
  name,
  label,
  type,
  errors,
  ...props
}: FieldInput<T>) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type='name'
        disabled
        name={name}
        {...props}
      />
      <ErrorMessage errors={errors} name={name} />
      </>
  );
};

export default ReadOnlyInput;
