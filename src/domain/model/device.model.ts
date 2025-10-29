export class Device {
  commandId: string;
  deviceId: string;
  name: string;

  constructor(commandId: string, deviceId: string, name: string) {
    this.commandId = commandId;
    this.deviceId = deviceId;
    this.name = name;
  }
}

export class DeviceCollection {
  private static devices: Device[];

  constructor(devices: Device[]) {
    DeviceCollection.devices = devices;
  }

  static findById(deviceId: string): Device {
    const result = DeviceCollection.devices.find(
      (device) => device.deviceId === deviceId,
    );
    if (result === undefined) {
      throw new Error(`Device with id ${deviceId} not found`);
    }
    return result;
  }

  static get(): Device[] {
    return DeviceCollection.devices;
  }
}

export enum DeviceState {
  ON,
  OFF,
}
