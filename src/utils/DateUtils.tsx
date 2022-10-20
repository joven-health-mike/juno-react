// Copyright 2022 Social Fabric, LLC

const pad = (value: number | string) => ('0' + value).slice(-2);

export function formatDate(date: Date): string {
  return `${new Date(date).toLocaleDateString()}`;
}

export function formatTime(date: Date): string {
  const fullTimeString = new Date(date).toLocaleTimeString();
  return `${fullTimeString.slice(0, 4)}${fullTimeString.slice(
    7,
    fullTimeString.length
  )}`;
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
