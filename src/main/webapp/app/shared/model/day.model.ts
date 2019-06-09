import { Moment } from 'moment';

export const enum DayType {
  WORKINGALL = 'WORKINGALL',
  COLLEGEONLY = 'COLLEGEONLY',
  HOLIDAY = 'HOLIDAY',
  EXAM = 'EXAM'
}

export const enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THRUSDAY = 'THRUSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

export interface IDay {
  id?: string;
  type?: DayType;
  dayOfTheWeek?: DayOfWeek;
  date?: Moment;
}

export class Day implements IDay {
  constructor(public id?: string, public type?: DayType, public dayOfTheWeek?: DayOfWeek, public date?: Moment) {}
}
