// Copyright 2022 Social Fabric, LLC

import { DateTime } from 'luxon';

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

export function formatDate(date: Date): string {
  return DateTime.fromJSDate(date).toFormat('M/dd');
}

export function formatTime(date: Date): string {
  return DateTime.fromJSDate(date).toFormat('h:mm a');
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}
