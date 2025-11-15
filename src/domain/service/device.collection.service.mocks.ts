import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { DeviceCollection } from '../model/device.collection.model';
import { CommandCollection } from '../model/command.collection.model';
import { CommandRepository } from 'src/port/out/persistence/command.repository';
import { Device } from '../model/device.model';
import { Command } from '../model/command.model';

export class DeviceRepositoryMock implements DeviceRepository {
  getAll(): DeviceCollection {
    return new DeviceCollection(<Device[]>[
      {
        deviceId: '1',
        name: 'name1',
      },
      {
        deviceId: '2',
        name: 'name2',
      },
      {
        deviceId: '3',
        name: 'name3',
      },
    ]);
  }
}

export class CommandRepositoryMock implements CommandRepository {
  getAll(): CommandCollection {
    return new CommandCollection(<Command[]>[
      {
        commandId: '1',
        name: 'name1',
      },
      {
        commandId: '2',
        name: 'name2',
      },
      {
        commandId: '3',
        name: 'name3',
      },
    ]);
  }
}
