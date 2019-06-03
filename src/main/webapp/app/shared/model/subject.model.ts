export interface ISubject {
  id?: string;
  subjectCode?: string;
  subjectName?: string;
  facultyId?: string;
}

export class Subject implements ISubject {
  constructor(public id?: string, public subjectCode?: string, public subjectName?: string, public facultyId?: string) {}
}
