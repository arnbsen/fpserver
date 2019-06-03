export const enum DeviceLocation {
  LAB = 'LAB',
  CLASS = 'CLASS',
  FACULTYROOM = 'FACULTYROOM',
  SSTAFFROOM = 'SSTAFFROOM'
}

export interface IDevice {
  id?: string;
  deviceID?: string;
  lastUpdated?: number;
  location?: DeviceLocation;
  locationSerial?: number;
}

export class Device implements IDevice {
  constructor(
    public id?: string,
    public deviceID?: string,
    public lastUpdated?: number,
    public location?: DeviceLocation,
    public locationSerial?: number
  ) {}
}
