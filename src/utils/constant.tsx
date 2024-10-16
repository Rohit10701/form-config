import { FieldInput, FieldType, Option } from '@/types/form'
import { Input } from '@mui/material';

export type FieldConfig = {
	name: string
	label: string
	type: FieldType
	placeholder?: string
	value?: string | number | readonly string[]
	required?: boolean
	options?: Option[]
}

const testFormConfig: FieldInput<Record<string, unknown>>[] = [
	{
		name: 'textField',
		label: 'Text Field',
		type: 'text',
		placeholder: 'Enter text',
		value: 'Sample text',
		required: true
	},
	{
		name: 'readOnly',
		label: 'read only',
		type: 'readonly',
		placeholder: 'Enter text',
		value: 'Sample text',
		required: true
	},
	{
		name: 'textareaField',
		label: 'Textarea Field',
		type: 'textarea',
		placeholder: 'Enter detailed text',
		value: 'Sample textarea content',
		required: false
	},
	{
		name: 'numberField',
		label: 'Number Field',
		type: 'number',
		placeholder: 'Enter a number',
		value: 12345,
		required: true
	},
	{
		name: 'selectField',
		label: 'Select Field',
		type: 'select',
		options: [
			{ label: 'Option 1', value: 'option1' },
			{ label: 'Option 2', value: 'option2' },
			{ label: 'Option 3', value: 'option3' }
		],
		placeholder: 'slec',
		// value: 'option2',
		required: true
	},
	{
		name: 'radioField',
		label: 'Radio Field',
		type: 'radio',
		options: [
			{ label: 'Radio 1', value: 'radio1' },
			{ label: 'Radio 2', value: 'radio2' },
			{ label: 'Radio 3', value: 'radio3' }
		],
		value: 'radio1',
		required: true
	},
	{
		name: 'checkboxField',
		label: 'Checkbox Field',
		type: 'checkbox',
		options: [
			{ label: 'Checkbox 1', value: 'checkbox1' },
			{ label: 'Checkbox 2', value: 'checkbox2' },
			{ label: 'Checkbox 3', value: 'checkbox3' }
		],
		value: ['checkbox3', 'checkbox1'],
		required: false
	},
	{
		name: 'phoneField',
		label: 'Phone Number Field',
		type: 'phone',
		placeholder: 'Enter phone number',
		value: '918340453292',
		required: true
	},
	{
		name: 'ExternalInput',
		label: 'External Input',
		type: 'text',
		component: Input,
		className:"bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
	},
	{
		name: 'dateField',
		label: 'Date Field',
		type: 'date',
		placeholder: 'Select date',
		value: '2023-08-27',
		required: true
	},
	// {
	// 	name: 'timeField',
	// 	label: 'Time Field',
	// 	type: 'time',
	// 	placeholder: 'Select time',
	// 	value: '14:30',
	// 	required: true,
	// },
	// {
	// 	name: 'currencyField',
	// 	label: 'Currency Field',
	// 	type: 'currency',
	// 	placeholder: 'Enter amount',
	// 	value: 23213,
	// 	required: true,
	// },
	// {
	// 	name: 'colorField',
	// 	label: 'Color Picker',
	// 	type: 'color',
	// 	value: '#ff5733',
	// 	required: true,
	// },
	// {
	// 	name: 'fileField',
	// 	label: 'File Upload',
	// 	type: 'file',
	// 	placeholder: 'Upload file',
	// 	required: true,
	// },

	// custom components

]

export default testFormConfig
