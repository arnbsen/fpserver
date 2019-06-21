import { Moment } from 'moment';

export const enum DayType {
  WORKINGALL = 'WORKINGALL',
  COLLEGEONLY = 'COLLEGEONLY',
  HOLIDAY = 'HOLIDAY',
  EXAM = 'EXAM'
}

export interface ISpecialOccasions {
  id?: string;
  startDate?: Moment;
  endDate?: Moment;
  type?: DayType;
  description?: string;
  academicSessionId?: string;
}

export class SpecialOccasions implements ISpecialOccasions {
  constructor(
    public id?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public type?: DayType,
    public description?: string,
    public academicSessionId?: string
  ) {}
}
