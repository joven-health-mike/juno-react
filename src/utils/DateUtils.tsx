// Copyright 2022 Social Fabric, LLC

import { DateTime } from 'luxon';

const DEFAULT_TIME_ZONE = 'America/Denver';

export type AvailableTimeZone =
  | 'America/New_York' // Eastern
  | 'America/Chicago' // Central
  | 'America/Denver' // Mountain
  | 'America/Los_Angeles' // Pacific
  | 'America/Phoenix'; // Arizona

export const TIME_ZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Phoenix',
];

export function formatDate(date: Date, timeZone: string | undefined): string {
  const luxonDate = DateTime.fromJSDate(date).setZone(
    timeZone || DEFAULT_TIME_ZONE
  );
  return luxonDate.toFormat('M/dd');
}

export function formatTime(date: Date, timeZone: string | undefined): string {
  const luxonDate = DateTime.fromJSDate(date).setZone(
    timeZone || DEFAULT_TIME_ZONE
  );
  return luxonDate.toFormat('h:mm a');
}

export function formatDateTime(
  date: Date,
  timeZone: string | undefined
): string {
  return `${formatDate(date, timeZone)} ${formatTime(date, timeZone)}`;
}
