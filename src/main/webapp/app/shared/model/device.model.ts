import { ILocation } from './location.model';

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
  locationName?: string;
  devLocId?: string;
}

export class Device implements IDevice {
  constructor(
    public id?: string,
    public lastUpdated?: number,
    public location?: DeviceLocation,
    public locationName?: string,
    public devLocId?: string
  ) {}
}

export interface ODevice {
  id?: string;
  lastUpdated?: number;
  location?: DeviceLocation;
  locationName?: string;
  devLoc?: ILocation;
}
