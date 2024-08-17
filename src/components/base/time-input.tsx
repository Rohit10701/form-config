import React from 'react';
import TimePicker, { TimePickerProps } from 'react-time-picker';

interface TimeInputProps extends Omit<TimePickerProps, 'onChange' | 'value'> {
  value?: string;
  onChange?: (value: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <TimePicker
      value={value}
      onChange={(time) => onChange?.(time)}
      {...props}
    />
  );
};

export default TimeInput;
