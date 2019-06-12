import { Moment } from 'moment';

export interface IAcademicSession {
  id?: string;
  academicSession?: string;
  startDate?: Moment;
  endDate?: Moment;
}

export class AcademicSession implements IAcademicSession {
  constructor(public id?: string, public academicSession?: string, public startDate?: Moment, public endDate?: Moment) {}
}
