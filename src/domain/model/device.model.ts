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

export enum DeviceState {
  ON,
  OFF,
}
