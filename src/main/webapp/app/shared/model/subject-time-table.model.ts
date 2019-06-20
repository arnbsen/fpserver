import { Subject } from './subject.model';

export const enum ClassType {
  LAB = 'LAB',
  REGULAR = 'REGULAR',
  TUTORIAL = 'TUTORIAL',
  MISC = 'MISC'
}

export interface ISubjectTimeTable {
  id?: string;
  startTime?: number;
  endTime?: number;
  classType?: ClassType;
  locationId?: string;
  subjectId?: string;
  dayTimeTableId?: string;
}

export interface OSubjectTimeTable {
  id?: string;
  startTime?: number;
  endTime?: number;
  classType?: ClassType;
  location?: Location;
  subject?: Subject;
  dayTimeTableId?: string;
}

export class SubjectTimeTable implements ISubjectTimeTable {
  constructor(
    public id?: string,
    public startTime?: number,
    public endTime?: number,
    public classType?: ClassType,
    public locationId?: string,
    public subjectId?: string,
    public dayTimeTableId?: string
  ) {}
}
