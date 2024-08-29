import { ReactNode, useEffect } from 'react'
import { Controller, FieldErrors, FieldName, useForm } from 'react-hook-form'
import { DependencyValue, DynamicFormProps, FieldInput } from '@/types/form'
import useDynamicForm from '@/hooks/use-dynamic-form'
import { FieldValuesFromFieldErrors } from '@hookform/error-message'
import { getFieldComponent } from '../base/_index'

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

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			{config?.fields?.map((fieldData: FieldInput<T>) => {
				const dependencyValues = fieldData.dependency?.on.reduce((acc, fieldName) => {
					acc[fieldName] = watch(fieldName as FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>)
					return acc
				}, {} as DependencyValue<string[]>)
				const FieldComponent = getFieldComponent(fieldData.type)

				return (
					(!fieldData.dependency ||
						(fieldData.dependency && fieldData.dependency.condition(dependencyValues))) && (
						<Controller
							key={fieldData.name}
							name={fieldData.name}
							control={control}
							render={({ field: controlledField }) => {
								const CustomComponent = fieldData?.component

								return (
									<>
										{CustomComponent ? (
											<CustomComponent
												{...fieldData}
												errors={errors}
												{...controlledField}
												onChange={controlledField.onChange as (...event: any[]) => void}
												name={
													controlledField.name as FieldName<
														FieldValuesFromFieldErrors<FieldErrors<T>>
													>
												}
											/>
										) : (
											<FieldComponent
												{...fieldData}
												errors={errors}
												{...controlledField}
												onChange={controlledField.onChange as (...event: any[]) => void}
												name={
													controlledField.name as FieldName<
														FieldValuesFromFieldErrors<FieldErrors<T>>
													>
												}
											/>
										)}
									</>
								)
							}}
						/>
					)
				)
			})}
			<button type='submit'>{config?.form?.submitText}</button>
		</form>
	)
}

export default DynamicForm
