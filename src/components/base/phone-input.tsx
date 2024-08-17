import React from 'react'
import PhoneInput, { CountryData, PhoneInputProps } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface PhoneNumberInputProps extends Omit<PhoneInputProps, 'onChange'> {
	value?: string
	onChange?: (value: unknown) => void
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange, ...props }) => {
	return (
		<PhoneInput
			country={'us'}
			value={value}
			onChange={(phone: string, country: CountryData) => {
				const reducedPhone = phone.replace(country.dialCode, '')
				onChange?.(country.dialCode + '-' + reducedPhone)
			}}
			{...props}
		/>
	)
}

export default PhoneNumberInput
