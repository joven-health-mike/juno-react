// Copyright 2022 Social Fabric, LLC

import React from 'react';

const Calendar: React.FC = () => {
  return (
    <div className={'calendar'}>
      <iframe
        title="Google Calendar"
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%234891ce&ctz=America%2FDenver&showTitle=0&showNav=1&showCalendars=1&mode=WEEK&src=aGVsbG9Aam92ZW5oZWFsdGguY29t&color=%23039BE5"
        width="800"
        height="600"
        frameBorder={'0'}
        scrolling="no"
      />
    </div>
  );
};

export default Calendar;
