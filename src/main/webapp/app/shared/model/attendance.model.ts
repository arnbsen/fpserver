import { Moment } from 'moment';

export const enum UserType {
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  SSTAFF = 'SSTAFF',
  HOD = 'HOD',
  CADMIN = 'CADMIN'
}

export interface IAttendance {
  id?: string;
  timestamp?: Moment;
  deviceID?: string;
  type?: UserType;
  devId?: string;
}

export class Attendance implements IAttendance {
  constructor(public id?: string, public timestamp?: Moment, public deviceID?: string, public type?: UserType, public devId?: string) {}
}
