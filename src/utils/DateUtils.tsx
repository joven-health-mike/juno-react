// Copyright 2022 Social Fabric, LLC

import { DateTime } from 'luxon';

const oneDayInMs = 24 * 60 * 60 * 1000;
const am8 = {
  hour: 9,
  minute: 0,
  second: 0,
  millisecond: 0,
};
const am830 = {
  hour: 9,
  minute: 30,
  second: 0,
  millisecond: 0,
};

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

export function defaultStartEndTime(now: DateTime) {
  const startTime = now.set(am8).toJSDate();
  const endTime = now.set(am830).toJSDate();
  return { startTime, endTime };
}

export function deltaDayStartEndTime(
  originalStart: Date,
  originalEnd: Date,
  dayDelta: number
) {
  const newStart = new Date(
    new Date(originalStart).getTime() + dayDelta * oneDayInMs
  );
  const newEnd = new Date(
    new Date(originalEnd).getTime() + dayDelta * oneDayInMs
  );
  return { newStart, newEnd };
}
