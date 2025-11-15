export class Device {
  deviceId: string;
  name: string;

  constructor(deviceId: string, name: string) {
    this.deviceId = deviceId;
    this.name = name;
  }
}

export enum DeviceState {
  ON,
  OFF,
}
