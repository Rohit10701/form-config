import { FieldValuesFromFieldErrors } from '@hookform/error-message'
import React, { InputHTMLAttributes, ReactNode } from 'react'
import { FieldErrors, FieldName, Path, PathValue } from 'react-hook-form' 
import { ZodType } from 'zod'

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
 export type Option = {
	label: string;
	value: string;
  };
export type FieldInput<T extends Record<string, unknown>> = InputHTMLAttributes<HTMLInputElement> & {
	name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>
	label?: string | ReactNode
	type: FieldType
	placeholder?: string
	style?:React.CSSProperties
	className?: string
	errors?:FieldErrors<T>
	required?: boolean
	value?:  Option | string[] | ((string | number | readonly string[]) & PathValue<T, Path<T>>) | undefined
	dependency?: {
		on: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>[];
		condition: (value: DependencyValue<FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>[]>) => boolean;
	  };
	options?: Option[]
	validation? : unknown
	component? : React.FC<any>
	styles?: {
		container?: React.CSSProperties;
		input?: React.CSSProperties;
		label?: React.CSSProperties;
		error?: React.CSSProperties;
	  };
	customClassName?: {
		container?: string;
		input?: string;
		label?: string;
		error?: string;
	  };
	columns?: number;
	rows?: number;
}
export type DependencyValue<T extends string[]> = {
	[K in T[number]]?: string;
  };
export interface FieldConfig<T extends Record<string, unknown>> {
	fields : FieldInput<T>[]
}

// export type GenericFieldType = 'text' | 'email' | 'password' | 'number' | 'range'
// export type FieldType =
// 	| 'checkbox'
// 	| 'radio'
// 	| 'file'
// 	| 'date'
// 	| 'textarea'
// 	| 'phone'
// 	| 'select'
// 	| GenericFieldType



export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'phone'
  | 'date'
  | 'time'
  | 'currency'
  | 'color'
  | 'file'
  | 'readonly'
  | 'url';






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
	schema? : ZodType<any, any, any>

}