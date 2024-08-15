'use client'
import useFormWatch from '@/hooks/use-form-watch'
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { FieldValues, UseFormReturn, useWatch } from 'react-hook-form'

// Form context properties interface
export interface FormContextProps<T extends FieldValues> {
	forms: Record<string, UseFormReturn<T>>
	addForm: (id: string, methods: UseFormReturn<T>) => void
	getFormValue: (id: string, name: keyof T) => any
}

// Form context creation
export const FormContext = createContext<FormContextProps<any> | undefined>(undefined)

// Custom hook to use the form context
export const useFormContext = <T extends FieldValues>() => {
	const context = useContext(FormContext as React.Context<FormContextProps<T> | undefined>)
	if (!context) {
		throw new Error('useFormContext must be used within a FormProvider')
	}
	return context
}

// Form provider component
export const FormProvider = ({ children }: { children: ReactNode }) => {
	const [forms, setForms] = useState<Record<string, UseFormReturn<any>>>({})

	// Add form to the context
	const addForm = (id: string, methods: UseFormReturn<any>) => {
		setForms((prev) => ({ ...prev, [id]: methods }))
	}

	// Get form value
	const getFormValue = (id: string, name: keyof any) => {
		return forms?.[id]?.getValues(name as string)
	}


	return (
		<FormContext.Provider value={{ forms, addForm, getFormValue }}>
			{children}
		</FormContext.Provider>
	)
}
