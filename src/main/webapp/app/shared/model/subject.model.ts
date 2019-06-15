import { IFaculty } from 'app/shared/model/faculty.model';

export interface ISubject {
  id?: string;
  subjectCode?: string;
  subjectName?: string;
  year?: number;
  semester?: number;
  ofDeptId?: string;
  faculties?: IFaculty[];
  facultyId?: string;
}

export class Subject implements ISubject {
  constructor(
    public id?: string,
    public subjectCode?: string,
    public subjectName?: string,
    public year?: number,
    public semester?: number,
    public ofDeptId?: string,
    public faculties?: IFaculty[],
    public facultyId?: string
  ) {}
}
