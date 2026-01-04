import { CommandCollection } from './command.collection.model';
import { Command } from './command.model';
import { CommandDevice } from './commanddevice.model';
import { DeviceCollection } from './device.collection.model';

export class CommandDeviceCollection {
  private static INSTANCE: CommandDeviceCollection;
  private static INITIALIZED = false;

  private commandDevices: CommandDevice[];

  constructor(commandDevices: CommandDevice[]) {
    this.commandDevices = commandDevices;
  }

  public static get(): CommandDeviceCollection {
    if (!CommandDeviceCollection.INITIALIZED) {
      CommandDeviceCollection.INITIALIZED = true;
      CommandDeviceCollection.INSTANCE = CommandDeviceCollection.combine(
        DeviceCollection.get(),
        CommandCollection.get(),
      );
      console.error(CommandDeviceCollection.get());
    }

    return CommandDeviceCollection.INSTANCE;
  }

  private static combine(
    deviceCollection: DeviceCollection,
    commandCollection: CommandCollection,
  ): CommandDeviceCollection {
    return new CommandDeviceCollection(
      deviceCollection.getAll().map((device) => {
        let command = commandCollection
          .getAll()
          .find((command) => command.name === device.name);
        if (command === undefined) {
          console.log(`Command for device ${device.name} not found`);
          command = new Command('unknown', 'unknown');
        }
        return new CommandDevice(command.commandId, device.deviceId);
      }),
    );
  }

  public find(id: string): CommandDevice {
    const result = this.commandDevices.find(
      (commandDevice) => commandDevice.commandId === id,
    );
    if (result === undefined) {
      throw new Error(`CommandDevice with id ${id} not found`);
    }
    return result;
  }

  public get(): CommandDevice[] {
    return this.commandDevices;
  }

  public getDeviceForCommand(id: string): CommandDevice {
    console.log('Have commandDevices: ', this.commandDevices);
    console.log('About to find Device for command id: ', id);
    const commandDevice = this.commandDevices.find((dc) => dc.commandId === id);
    if (commandDevice === undefined) {
      console.log(`CommandDevice ${id} not found`);
      return new CommandDevice('unknown', 'unknown');
    } else {
      return commandDevice;
    }
  }
}
