export interface ISubject {
  id?: string;
  subjectCode?: string;
  subjectName?: string;
  hODId?: string;
  ofDeptId?: string;
  facultyId?: string;
}

export class Subject implements ISubject {
  constructor(
    public id?: string,
    public subjectCode?: string,
    public subjectName?: string,
    public hODId?: string,
    public ofDeptId?: string,
    public facultyId?: string
  ) {}
}
