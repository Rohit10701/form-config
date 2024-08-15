import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '../base/input';
import { DynamicFormProps, FieldInput } from '@/types/form';
import useDynamicForm from '@/hooks/use-dynamic-form';

const DynamicForm = <T extends Record<string, unknown>>({
  id,
  config,
}: DynamicFormProps<T>) => {
  const { control, handleSubmit, reset } = useDynamicForm<T>(id, config);

  // Extract default values from config fields
  useEffect(() => {
    const defaultValues = config.fields?.reduce((acc, field) => {
      // Ensure field.value exists and is included in the defaultValues
      if ('value' in field) {
        acc[field.name as keyof T] = field.value;
      }
      return acc;
    }, {} as T);

    if (defaultValues) {
      reset(defaultValues);
    }
  }, [config.fields, reset]);

  const submitHandler = (data: T) => {
    config?.form?.onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {config.fields?.map((fieldData: FieldInput<T>) => (
        <Controller
          key={fieldData.name}
          name={fieldData.name as keyof T}
          control={control}
          render={({ field: controlledField }) => (
            <Input
              {...fieldData}
              value={controlledField.value ?? ''}
              onChange={controlledField.onChange}
              onBlur={controlledField.onBlur}
              disabled={controlledField.disabled}
              name={controlledField.name as string}
            />
          )}
        />
      ))}
      <button type="submit">{config?.form?.submitText}</button>
    </form>
  );
};

export default DynamicForm;
