import { ISubjectTimeTable } from 'app/shared/model/subject-time-table.model';

export const enum DayType {
  WORKINGALL = 'WORKINGALL',
  COLLEGEONLY = 'COLLEGEONLY'
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

export interface IDayTimeTable {
  id?: string;
  dayType?: DayType;
  dayOfWeek?: DayOfWeek;
  subjects?: ISubjectTimeTable[];
  timeTableId?: string;
}

export class DayTimeTable implements IDayTimeTable {
  constructor(
    public id?: string,
    public dayType?: DayType,
    public dayOfWeek?: DayOfWeek,
    public subjects?: ISubjectTimeTable[],
    public timeTableId?: string
  ) {}
}
