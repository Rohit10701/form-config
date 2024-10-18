import { cn } from '@/utils/helpers'
import React from 'react'
import DatePicker, { DatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DateInputProps {
	value?: Date | [Date, Date] // Accommodate single date or date range
	onChange?: (date: Date | [Date, Date] | null) => void // Handle both single and range selection
	className?: string
	label?: string
  wrapperClassName? :string,
  name?: string
}

const DateInput: React.FC<DateInputProps> = ({ name, value, onChange, className, wrapperClassName, label, ...props }) => {
	return (
		<div className='mb-6'>
			{' '}
			{/* Added margin bottom for spacing */}
			{label && (
				<label
					className={cn('block mb-2 text-sm font-medium text-gray-900 dark:text-white')}
					htmlFor={name}>
					{label}
				</label>
			)}{' '}
			{/* @ts-ignore */}
			<DatePicker
      name={name}
				selected={Array.isArray(value) ? value[0] : value} // Handle single date selection
				startDate={Array.isArray(value) ? value[0] : undefined} // Handle range start date
				endDate={Array.isArray(value) ? value[1] : undefined} // Handle range end date
				onChange={(date) => {
					if (onChange) {
						onChange(date as Date | [Date, Date] | null)
					}
				}}
        wrapperClassName={cn("w-full ", wrapperClassName)}
				className={cn(
					'bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
					className
				)}
				{...props}
			/>
		</div>
	)
}

export default DateInput
