import React, { useState, useEffect } from 'react';
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
  const [clientValue, setClientValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    setClientValue(value);
  }, [value]);

  return (
    <TimePicker
      className="w-[200px]"
      value={clientValue}
      onChange={(time) => onChange?.(time)}
      {...props}
    />
  );
};

export default TimeInput;
