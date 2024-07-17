import { useFormContext } from "@/context/form-context";
import {
  DynamicFormProps,
  FieldConfig,
  FieldInput,
  FormConfig,
} from "@/types/form";
import { Controller, Path, PathValue } from "react-hook-form";
import Input from "../base/input";
import { useEffect } from "react";
import useDynamicForm from "@/hooks/use-dynamic-form";

const DynamicForm = <T extends Record<string, unknown>>({
  id,
  config,
  defaultValues,
}: DynamicFormProps<T>) => {
  const {
    control,
    handleSubmit,
    setValue,
    config: formConfig,
  } = useDynamicForm<T>(id, config);

  // Todo : have just one default setter just using config
  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(
          key as Path<T>,
          defaultValues[key as Path<T>] as PathValue<T, Path<T>>,
        );
      });
    }
  }, [setValue, defaultValues]);



  const submitHandler = (data: T) => {
    config?.form?.onSubmit(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        {config.fields?.map((field: FieldInput<T>) => (
          <Controller
            key={field.name}
            name={field.name as Path<T>}
            control={control}
            render={({ field: controlledField }) => (
              <Input
                {...field}
                defaultValue={controlledField.value}
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
    </>
  );
};

export default DynamicForm;
