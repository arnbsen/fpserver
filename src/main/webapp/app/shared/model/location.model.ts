export interface ILocation {
  id?: string;
  locationName?: string;
}

export class Location implements ILocation {
  constructor(public id?: string, public locationName?: string) {}
}
