export const enum UserType {
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  SSTAFF = 'SSTAFF',
  HOD = 'HOD',
  CADMIN = 'CADMIN'
}

export interface IBiometricBackup {
  id?: string;
  forUserType?: UserType;
  identifier?: string;
  jsonFileContentType?: string;
  jsonFile?: any;
}

export class BiometricBackup implements IBiometricBackup {
  constructor(
    public id?: string,
    public forUserType?: UserType,
    public identifier?: string,
    public jsonFileContentType?: string,
    public jsonFile?: any
  ) {}
}
