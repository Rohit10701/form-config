import { useEffect } from 'react'
import { Controller, FieldErrors, FieldName, useForm } from 'react-hook-form'
import Input from '../base/input'
import { DependencyValue, DynamicFormProps, FieldInput } from '@/types/form'
import useDynamicForm from '@/hooks/use-dynamic-form'
import { FieldValuesFromFieldErrors } from '@hookform/error-message'

const DynamicForm = <T extends Record<string, unknown>>({
	id,
	config,
	schema
}: DynamicFormProps<T>) => {
	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors }
	} = useDynamicForm<T>(id, config, schema)

	// Extract default values from config fields
	useEffect(() => {
		const defaultValues = config.fields?.reduce((acc, field) => {
			// Ensure field.value exists and is included in the defaultValues
			if ('value' in field) {
				acc[field.name as keyof T] = field.value
			}
			return acc
		}, {} as T)

		if (defaultValues) {
			reset(defaultValues)
		}
	}, [config.fields, reset])

	const submitHandler = (data: T) => {
		config?.form?.onSubmit(data)
	}

	console.log({ errors })

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			{config.fields?.map((fieldData: FieldInput<T>) => {
				const dependencyValues = fieldData.dependency?.on.reduce((acc, fieldName) => {
					acc[fieldName] = watch(fieldName as FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>)
					return acc
				}, {} as DependencyValue<string[]>)

				return (
					(!fieldData.dependency ||
						(fieldData.dependency && fieldData.dependency.condition(dependencyValues))) && (
						<Controller
							key={fieldData.name}
							name={fieldData.name}
							control={control}
							render={({ field: controlledField }) => (
								<Input
									{...fieldData}
									errors={errors}
									value={controlledField.value}
									onChange={controlledField.onChange}
									onBlur={controlledField.onBlur}
									disabled={controlledField.disabled}
									name={
										controlledField.name as FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>
									}
								/>
							)}
						/>
					)
				)
			})}
			<button type='submit'>{config?.form?.submitText}</button>
		</form>
	)
}

export default DynamicForm
