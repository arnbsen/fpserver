import { ISubject } from 'app/shared/model/subject.model';

export interface IHOD {
  id?: string;
  authCode?: string;
  departmentId?: string;
  subjectTakings?: ISubject[];
  userId?: string;
}

export class HOD implements IHOD {
  constructor(public id?: string, public authCode?: string, public departmentId?: string, public subjectTakings?: ISubject[]) {}
}
