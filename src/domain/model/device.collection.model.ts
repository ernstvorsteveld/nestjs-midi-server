import { Device } from './device.model';

export class DeviceCollection {
  private static INSTANCE: DeviceCollection;

  private devices: Device[];

  constructor(devices: Device[]) {
    this.devices = devices;
    DeviceCollection.INSTANCE = this;
  }

  public static get(): DeviceCollection {
    return DeviceCollection.INSTANCE;
  }

  findById(deviceId: string): Device {
    const result = this.devices.find((device) => device.deviceId === deviceId);
    if (result === undefined) {
      throw new Error(`Device with id ${deviceId} not found`);
    }
    return result;
  }

  getAll(): Device[] {
    return this.devices;
  }
}
