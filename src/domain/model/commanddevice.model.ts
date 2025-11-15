export class CommandDevice {
  commandId: string;
  deviceId: string;

  constructor(commandId: string, deviceId: string) {
    this.commandId = commandId;
    this.deviceId = deviceId;
  }

  getCommandId(): string {
    return this.commandId;
  }

  getDeviceId(): string {
    return this.deviceId;
  }
}
