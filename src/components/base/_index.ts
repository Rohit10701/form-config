import TimeInput from 'react-time-picker/dist/TimeInput'
import CheckboxInput from './checkbox-input'
import DateInput from './date-input'
import GenericInput from './generic-input'
import PhoneNumberInput from './phone-input'
import RadioInput from './radio-input'
import SelectInput from './select-input'
import TextareaInput from './textarea-input'
import CurrencyInput from './currency-input'
import ColorInput from './color-input'
import FileInput from './file-input'

export function getFieldComponent(type: string): React.FC<any> {
	switch (type) {
		case 'textarea':
			return TextareaInput
		case 'select':
			return SelectInput
		case 'radio':
			return RadioInput
		case 'checkbox':
			return CheckboxInput
		case 'phone':
			return PhoneNumberInput
		case 'date':
			return DateInput
		case 'time':
			return TimeInput
		case 'currency':
			return CurrencyInput
		case 'color':
			return ColorInput
		case 'file':
			return FileInput
		default:
			return GenericInput
	}
}

export {
	TimeInput,
	CheckboxInput,
	DateInput,
	GenericInput,
	PhoneNumberInput,
	RadioInput,
	TextareaInput,
	CurrencyInput,
	ColorInput,
	FileInput
}
