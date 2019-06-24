import { Account } from 'app/core';

export interface IFaculty {
  id?: string;
  facultyCode?: string;
  departmentId?: string;
  subjectId?: string;
  userId?: string;
}
export interface OFaculty {
  id?: string;
  facultyCode?: string;
  departmentId?: string;
  subjectId?: string;
  user?: Account;
}
export class Faculty implements IFaculty {
  constructor(public id?: string, public facultyCode?: string, public departmentId?: string, public subjectId?: string) {}
}
