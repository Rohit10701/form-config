"use client"
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

// Form context properties interface
export interface FormContextProps<T extends FieldValues> {
    forms: Record<string, UseFormReturn<T>>
    addForm: (id: string, methods: UseFormReturn<T>) => void
    getFormValue: (id: string, name: keyof T) => any
    watchFormValue: (id: string, fields?: (keyof T)[], callback?: (values: Partial<Record<keyof T, any>>) => void) => () => void
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

    // Watch form value for specific fields or all fields
    const watchFormValue = (id: string, fields: (keyof any)[] = [], callback?: (values: Partial<Record<keyof any, any>>) => void) => {
        const form = forms?.[id]
        if (!form) return () => {}

        const updateValues = () => {
            const values = fields.reduce((acc, field) => {
                acc[field] = form.getValues(field as string)
                return acc
            }, {} as Partial<Record<keyof any, any>>)
            if (callback) callback(values)
        }

        if (fields.length === 0) {
            // Watch all fields
            return form.watch(updateValues)
        } else {
            // Watch specific fields
            const unsubscribers = fields.map((field) =>
                form.watch((_, { name }) => {
                    if (name === field) {
                        updateValues()
                    }
                })
            )
            return () => unsubscribers.forEach(unsub => unsub())
        }
    }

    return (
        <FormContext.Provider value={{ forms, addForm, getFormValue, watchFormValue }}>
            {children}
        </FormContext.Provider>
    )
}


