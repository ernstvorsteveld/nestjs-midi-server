import { CommandDevice } from './commanddevice.model';

export class CommandDeviceCollection {
  public static DEVICE_COMMAND_COLLECTION: CommandDeviceCollection;

  private commandDevices: CommandDevice[];

  constructor(commandDevices: CommandDevice[]) {
    this.commandDevices = commandDevices;
  }

  public get(): CommandDevice[] {
    return this.commandDevices;
  }
}
