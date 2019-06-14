import { ISubject } from 'app/shared/model/subject.model';

export interface IFaculty {
  id?: string;
  facultyCode?: string;
  departmentId?: string;
  subjectsTakings?: ISubject[];
  userId?: string;
}

export class Faculty implements IFaculty {
  constructor(public id?: string, public facultyCode?: string, public departmentId?: string, public subjectsTakings?: ISubject[]) {}
}
