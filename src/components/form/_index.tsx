import React, { ReactNode, useEffect, useInsertionEffect, useLayoutEffect } from 'react'
import { Controller, FieldErrors, FieldName, useForm } from 'react-hook-form'
import { DependencyValue, FormConfig, FieldInput } from '@/types/form'
import useDynamicForm from '@/hooks/use-dynamic-form'
import { FieldValuesFromFieldErrors } from '@hookform/error-message'
import { getFieldComponent } from '../base/_index'
import { cn } from '@/utils/helpers'
import { ZodType } from 'zod'

export interface DynamicFormProps<T extends Record<string, unknown>> {
	id: string
	config: FormConfig<T>
	defaultValues?: Partial<T>
	schema?: ZodType<any, any, any>
	className?: string
	darkMode?: boolean
}

const DynamicForm = <T extends Record<string, unknown>>(props: DynamicFormProps<T>) => {
	const { id, config, schema, className, darkMode = true } = props
	const {
		control,
		handleSubmit,
		watch,
    reset,
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
		<form
			id={id || 'form'}
			className={cn(
				'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 bg-white dark:bg-slate-600',
				`${darkMode ? ' dark ' : ''}`,
				className
			)}
			onSubmit={handleSubmit(submitHandler)}>
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
									<div>
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
												className={cn(fieldData?.className, fieldData?.customClassName?.input)}
												style={{
													...fieldData?.style,
													...fieldData.styles?.input
												}}
											/>
										) : (
											<FieldComponent
												{...fieldData}
												{...controlledField}
												errors={errors}
												onChange={controlledField.onChange as (...event: any[]) => void}
												name={
													controlledField.name as FieldName<
														FieldValuesFromFieldErrors<FieldErrors<T>>
													>
												}
												className={cn(fieldData?.className, fieldData?.customClassName?.input)}
												style={{
													...fieldData?.style,
													...fieldData.styles?.input
												}}
											/>
										)}
									</div>
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
