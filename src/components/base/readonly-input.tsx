import { FieldInput } from '@/types/form';
import { ErrorMessage } from "@hookform/error-message";
import { cn } from '@/utils/helpers';

const ReadOnlyInput = <T extends Record<string, unknown>>({
  name,
  label,
  errors,
  className,
  ...props
}: FieldInput<T>) => {
  return (
    <div className="mb-6"> {/* Added margin bottom for spacing */}
      {label && (
        <label htmlFor={name} className={cn("block mb-2 text-sm font-medium text-gray-900 dark:text-white")}>
          {label}
        </label>
      )}
      <input
        id={name}
        type='text'
        disabled
        name={name}
        className={cn("bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white", className)}
        {...props}
      />
      {errors && <ErrorMessage errors={errors} name={name} />} 
    </div>
  );
};

export default ReadOnlyInput;
