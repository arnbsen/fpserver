export interface IStudent {
  id?: string;
  yearJoined?: number;
  currentYear?: number;
  currentSem?: number;
  classRollNumber?: number;
  currentSession?: string;
  departmentId?: string;
}

export class Student implements IStudent {
  constructor(
    public id?: string,
    public yearJoined?: number,
    public currentYear?: number,
    public currentSem?: number,
    public classRollNumber?: number,
    public currentSession?: string,
    public departmentId?: string
  ) {}
}
