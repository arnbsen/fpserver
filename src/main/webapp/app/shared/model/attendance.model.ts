import { Moment } from 'moment';

export interface IAttendance {
  id?: string;
  timestamp?: Moment;
  deviceID?: string;
  devId?: string;
}

export class Attendance implements IAttendance {
  constructor(public id?: string, public timestamp?: Moment, public deviceID?: string, public devId?: string) {}
}
