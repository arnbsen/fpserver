export interface IIntermdiateUser {
  id?: string;
  deviceUserName?: string;
  hardwareID?: string;
  otherParams?: string;
}

export class IntermdiateUser implements IIntermdiateUser {
  constructor(public id?: string, public deviceUserName?: string, public hardwareID?: string, public otherParams?: string) {}
}
