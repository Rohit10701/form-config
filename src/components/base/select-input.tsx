import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message'
import React, { SelectHTMLAttributes } from 'react'
import { FieldErrors, FieldName } from 'react-hook-form'

interface SelectInputProps<T> extends SelectHTMLAttributes<HTMLSelectElement> {

  placeholder: string
	label?: string
	name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>
	options: { value: string; label: string }[]
	errors?: FieldErrors<T>
}

const SelectInput = <T,>({ name, label, options, errors,placeholder, ...props }: SelectInputProps<T>) => {
	return (
		<div>
			{label && <label htmlFor={name}>{label}</label>}
			<select
        onChange={props.onChange}
        value={props.value || ''}
				{...props}>
				{options.map((option) => (
          <>
          <option style={{display: "none"}}>{placeholder}</option>
					<option
						key={option.value}
						value={option.value}>
						{option.label}
					</option>
          </>
				))}
			</select>
			<ErrorMessage
				errors={errors}
				name={name}
			/>
		</div>
	)
}

export default SelectInput
