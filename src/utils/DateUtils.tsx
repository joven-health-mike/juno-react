// Copyright 2022 Social Fabric, LLC

const pad = (value: number | string) => ('0' + value).slice(-2);

export function formatDate(date: Date): string {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let monthString = month.toString();
  let dayOfMonth = date.getDate();
  let dayString = dayOfMonth.toString();

  return pad(monthString) + '/' + pad(dayString) + '/' + year;
}

export function formatDateTime(date: Date, timeZoneOffset: number): string {
  let utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  let localTime = new Date(utcTime + 3600000 * timeZoneOffset);
  let localHours = localTime.getHours();
  let hoursString = pad(localHours > 12 ? localHours - 12 : localHours);
  let amPmString = localHours > 12 ? 'p.m.' : 'a.m.';

  return (
    formatDate(date) +
    ', ' +
    hoursString +
    ':' +
    pad(localTime.getMinutes()) +
    ' ' +
    amPmString
  );
}
