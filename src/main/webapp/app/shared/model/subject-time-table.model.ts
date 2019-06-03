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
  subjectId?: string;
  dayTimeTableId?: string;
}

export class SubjectTimeTable implements ISubjectTimeTable {
  constructor(
    public id?: string,
    public startTime?: number,
    public endTime?: number,
    public classType?: ClassType,
    public subjectId?: string,
    public dayTimeTableId?: string
  ) {}
}
