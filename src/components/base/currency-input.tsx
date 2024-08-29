import { FieldValuesFromFieldErrors } from '@hookform/error-message'
import React from 'react'
import CurrencyInput, { CurrencyInputOnChangeValues } from 'react-currency-input-field'
import { FieldErrors, FieldName } from 'react-hook-form'

interface CurrencyInputProps<T> {
	name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>
	onChange?: (value:string) => void
}

const CurrencyCustomInput = <T, > ({ name, onChange, ...props } : CurrencyInputProps<T>) => {
	return (
		<>
			<CurrencyInput
				id={name}
				name={name}
				onValueChange={(value)=>onChange(value)}
				{...props}
			/>
		</>
	)
}

export default CurrencyCustomInput
