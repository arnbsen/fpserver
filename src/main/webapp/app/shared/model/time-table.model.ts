import { IDayTimeTable, ODayTimeTable } from 'app/shared/model/day-time-table.model';
import { IDepartment } from './department.model';

export interface ITimeTable {
  id?: string;
  year?: number;
  semester?: number;
  departmentId?: string;
  dayTimeTables?: IDayTimeTable[];
}
export interface OTimeTable {
  id?: string;
  year?: number;
  semester?: number;
  department?: IDepartment;
  dayTimeTables?: ODayTimeTable[];
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
