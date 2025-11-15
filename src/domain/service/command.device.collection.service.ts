import { Inject, Injectable } from '@nestjs/common';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { DeviceCollection } from '../model/device.collection.model';
import { CommandRepository } from 'src/port/out/persistence/command.repository';
import { CommandDeviceCollection } from '../model/commanddevice.collection.model';
import { CommandDevice } from '../model/commanddevice.model';
import { Command } from '../model/command.model';
import { CommandCollection } from '../model/command.collection.model';

@Injectable()
export class CommandDeviceCollectionInitializer {
  private readonly deviceRepository: DeviceRepository;
  private readonly commandRepository: CommandRepository;

  private commandDeviceCollection: CommandDeviceCollection;

  constructor(
    @Inject(DeviceRepository) deviceRepository: DeviceRepository,
    @Inject(CommandRepository) commandRepository: CommandRepository,
  ) {
    this.deviceRepository = deviceRepository;
    this.commandRepository = commandRepository;
    this.execute();
  }

  private execute(): void {
    DeviceCollection.DEVICE_COLLECTION = this.deviceRepository.getAll();
    CommandCollection.COMMAND_COLLECTION = this.commandRepository.getAll();
    this.combine(
      DeviceCollection.DEVICE_COLLECTION,
      CommandCollection.COMMAND_COLLECTION,
    );
  }

  private combine(
    deviceCollection: DeviceCollection,
    commandCollection: CommandCollection,
  ): void {
    this.commandDeviceCollection = new CommandDeviceCollection(
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

  getCommandDeviceCollection(): CommandDeviceCollection {
    return this.commandDeviceCollection;
  }
}
