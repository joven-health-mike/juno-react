// Copyright 2022 Social Fabric, LLC

import { DateTime } from 'luxon';

const DEFAULT_TIME_ZONE = 'America/Denver';

export function formatDate(date: Date, timeZone: string | undefined): string {
  const luxonDate = DateTime.fromJSDate(date).setZone(
    timeZone || DEFAULT_TIME_ZONE
  );
  return `${luxonDate.month}/${luxonDate.day}`;
}

export function formatTime(date: Date, timeZone: string | undefined): string {
  const luxonDate = DateTime.fromJSDate(date).setZone(
    timeZone || DEFAULT_TIME_ZONE
  );
  let hourStr = `${luxonDate.hour}`;
  let amPmStr = `am`;
  if (luxonDate.hour === 0 || luxonDate.hour === 12) {
    hourStr = `12`;
  } else if (luxonDate.hour > 12) {
    hourStr = `${luxonDate.hour - 12}`;
    amPmStr = `pm`;
  }
  return `${hourStr}:${luxonDate.minute} ${amPmStr}`;
}

export function formatDateTime(
  date: Date,
  timeZone: string | undefined
): string {
  return `${formatDate(date, timeZone)} ${formatTime(date, timeZone)}`;
}
