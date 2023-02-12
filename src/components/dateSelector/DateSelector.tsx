import React from 'react';
import DatePicker from 'react-datepicker';
import { Wrapper } from './styled';

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
    <Wrapper>
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        timeFormat="h:mm"
        timeCaption={label}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </Wrapper>
  );
};

export default DateSelector;
