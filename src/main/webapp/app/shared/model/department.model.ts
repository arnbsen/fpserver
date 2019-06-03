export interface IDepartment {
  id?: string;
  deptCode?: string;
  deptName?: string;
}

export class Department implements IDepartment {
  constructor(public id?: string, public deptCode?: string, public deptName?: string) {}
}
