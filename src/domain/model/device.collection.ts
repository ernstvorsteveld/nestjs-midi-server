import { Device } from './device.model';

export class DeviceCollection {
  private devices: Device[];

  constructor(devices: Device[]) {
    this.devices = devices;
  }

  findById(deviceId: string): Device {
    const result = this.devices.find((device) => device.deviceId === deviceId);
    if (result === undefined) {
      throw new Error(`Device with id ${deviceId} not found`);
    }
    return result;
  }

  get(): Device[] {
    return this.devices;
  }
}
