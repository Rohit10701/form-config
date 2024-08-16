import React, { InputHTMLAttributes, ReactNode } from 'react'
import { Path, PathValue } from 'react-hook-form'

export interface FormConfig<T extends Record<string, unknown>> {
	form: {
		id: string
		submitText: ReactNode | string
		onSubmit: (data: T) => void
	}
	// formType?: 'simple' | 'stepper' | 'otp'
	fields?: FieldInput<T>[]
	options?: {
		stepper?: StepperConfig
		otp?: OTPConfig<T>
	}
}
export type FieldInput<T extends Record<string, unknown>> = InputHTMLAttributes<HTMLInputElement> & {
	name: string
	label?: string | ReactNode
	type: FieldType
	placeholder?: string
	required?: boolean
	value?: ((string | number | readonly string[]) & PathValue<T, Path<T>>) | undefined
	dependency?: {
		on: string[];
		condition: (value: DependencyValue<string[]>) => boolean;
	  };
}
export type DependencyValue<T extends string[]> = {
	[K in T[number]]?: string;
  };
export interface FieldConfig<T extends Record<string, unknown>> {
	fields : FieldInput<T>[]
}

export type GenericFieldType = 'text' | 'email' | 'password' | 'number' | 'range'
export type FieldType =
	| 'checkbox'
	| 'radio'
	| 'file'
	| 'date'
	| 'textarea'
	| 'phone'
	| 'select'
	| GenericFieldType









//not need to for prototype
interface StepperConfig {
	progress?: ReactNode
	steps: {
		title: string
		fields: string[]
		children: StepperConfig
		skip: boolean
	}[]
}

interface OTPConfig<T extends Record<string, unknown>> {
	fields: FieldConfig<T>[]
}


export interface DynamicFormProps<T extends Record<string, unknown>> {
	id: string
	config: FormConfig<T>
	defaultValues?: Partial<T>
}