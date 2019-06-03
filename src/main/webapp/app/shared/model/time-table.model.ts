import { IDayTimeTable } from 'app/shared/model/day-time-table.model';

export interface ITimeTable {
  id?: string;
  year?: number;
  semester?: number;
  departmentId?: string;
  dayTimeTables?: IDayTimeTable[];
}

export class TimeTable implements ITimeTable {
  constructor(
    public id?: string,
    public year?: number,
    public semester?: number,
    public departmentId?: string,
    public dayTimeTables?: IDayTimeTable[]
  ) {}
}
