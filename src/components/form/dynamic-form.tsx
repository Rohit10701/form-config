import { Controller, Path, PathValue } from "react-hook-form";
import { useEffect } from "react";
import useDynamicForm from "@/hooks/use-dynamic-form";
import Input from "../base/input";
import { DynamicFormProps, FieldInput } from "@/types/form";

const DynamicForm = <T extends Record<string, unknown>>({
  id,
  config,
  defaultValues,
}: DynamicFormProps<T>) => {
  const {
    control,
    handleSubmit,
    setValue,
  } = useDynamicForm<T>(id, config);

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(
          key as Path<T>,
          defaultValues[key as keyof T] as PathValue<T, Path<T>>,
        );
      });
    }
  }, [setValue, defaultValues]);

  const submitHandler = (data: T) => {
    config?.form?.onSubmit(data);
  };

  console.log({config})
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {config.fields?.map((fieldData: FieldInput<T>) => (
        <Controller
          key={fieldData.name}
          name={fieldData.name as Path<T>}
          control={control}
          render={({ field: controlledField }) => (
            <Input
              {...fieldData}
              value={controlledField.value}
              onChange={controlledField.onChange}
              onBlur={controlledField.onBlur}
              disabled={controlledField.disabled}
              name={controlledField.name}
            />
          )}
        />
      ))}
      <button>{config?.form?.submitText}</button>
    </form>
  );
};

export default DynamicForm;