import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateInputProps extends Omit<ReactDatePickerProps, 'onChange' | 'selected'> {
  value?: Date;
  onChange?: (date: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <DatePicker
      selected={value}
      onChange={(date: Date | null) => onChange?.(date as Date)}
      {...props}
    />
  );
};

export default DateInput;
