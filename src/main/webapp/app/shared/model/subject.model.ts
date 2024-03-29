import { IFaculty } from 'app/shared/model/faculty.model';

export interface ISubject {
  id?: string;
  subjectCode?: string;
  subjectName?: string;
  year?: number;
  semester?: number;
  ofDeptId?: string;
  faculty?: IFaculty[];
}

export class Subject implements ISubject {
  constructor(
    public id?: string,
    public subjectCode?: string,
    public subjectName?: string,
    public year?: number,
    public semester?: number,
    public ofDeptId?: string,
    public faculty?: IFaculty[]
  ) {}
}
