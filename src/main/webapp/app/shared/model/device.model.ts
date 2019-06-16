export const enum DeviceLocation {
  LAB = 'LAB',
  CLASS = 'CLASS',
  FACULTYROOM = 'FACULTYROOM',
  SSTAFFROOM = 'SSTAFFROOM'
}

export interface IDevice {
  id?: string;
  lastUpdated?: number;
  location?: DeviceLocation;
}

export class Device implements IDevice {
  constructor(public id?: string, public lastUpdated?: number, public location?: DeviceLocation) {}
}
