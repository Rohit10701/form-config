import React from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateInputProps {
  value?: Date | [Date, Date]; // Accommodate single date or date range
  onChange?: (date: Date | [Date, Date] | null) => void; // Handle both single and range selection
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <DatePicker
      selected={Array.isArray(value) ? value[0] : value} // Handle single date selection
      startDate={Array.isArray(value) ? value[0] : undefined} // Handle range start date
      endDate={Array.isArray(value) ? value[1] : undefined} // Handle range end date
      onChange={(date) => {
        if (onChange) {
          onChange(date as Date | [Date, Date] | null);
        }
      }}
      {...props}
    />
  );
};

export default DateInput;
