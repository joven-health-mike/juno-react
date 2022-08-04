import React from 'react';
import DatePicker from 'react-datepicker';

type DateSelectorProps = {
  selected: Date;
  onChange: (date: Date) => void;
  label: string;
};

const DateSelector: React.FC<DateSelectorProps> = ({
  selected,
  onChange,
  label,
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      showTimeSelect
      timeFormat="h:mm"
      timeCaption={label}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};

export default DateSelector;
