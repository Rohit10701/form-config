"use client"
import { FieldType } from '@/types/form'
import { ReactNode, createContext, useContext, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export interface FormContextProps<T extends FieldValues> {
	forms: Record<string, UseFormReturn<T>>
	addForm: (id: string, methods: UseFormReturn<T>) => void
	// setFormValue: (id: string, name: keyof T, value: any) => void
	getFormValue: (id: string, name: keyof T) => any
	watchFormValue: (id: string, name: keyof T) => any
}

export const FormContext = createContext<FormContextProps<any> | undefined>(undefined)


export const useFormContext = <T extends Record<string, unknown>>() => {
	const context = useContext(FormContext as React.Context<FormContextProps<T> | undefined>)
	if (!context) {
		throw new Error('useFormContext must be used within a FormProvider')
	}
	return context
}

export const FormProvider = ({ children }: { children: ReactNode }) => {
	const [forms, setForms] = useState<Record<string, UseFormReturn<any>>>({})

	// Todo : have a default id for the forms
	const addForm = (id: string, methods: UseFormReturn<any>) => {
		setForms((prev) => ({ ...prev, [id]: methods }))
	}

	// const setFormValue = (id: string, name: string | number | symbol, value: any) => {
	// 		forms?.[id]?.setValue(name as string, value)
	// }

	const getFormValue = (id: string, name: string | number | symbol) => {
		return forms?.[id]?.getValues(name as string)
	}

	const watchFormValue = (id: string, name: string | number | symbol) => {
			return forms?.[id]?.watch(name as string)
	}

	return (
		<FormContext.Provider value={{ forms, addForm, getFormValue, watchFormValue }}>
			{children}
		</FormContext.Provider>
	)
}
