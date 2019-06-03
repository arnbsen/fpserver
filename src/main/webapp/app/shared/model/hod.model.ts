export interface IHOD {
  id?: string;
  authCode?: string;
  departmentId?: string;
}

export class HOD implements IHOD {
  constructor(public id?: string, public authCode?: string, public departmentId?: string) {}
}
