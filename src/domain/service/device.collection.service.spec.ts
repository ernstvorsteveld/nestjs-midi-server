import { Test, TestingModule } from '@nestjs/testing';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { CommandRepository } from 'src/port/out/persistence/command.repository';
import {
  CommandRepositoryMock,
  DeviceRepositoryMock,
} from './device.collection.service.mocks';
import { CommandDeviceCollectionInitializer } from './command.device.collection.service';

describe('CommandDeviceCollectionInitializer', () => {
  let service: CommandDeviceCollectionInitializer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DeviceRepository, useClass: DeviceRepositoryMock },
        { provide: CommandRepository, useClass: CommandRepositoryMock },
        CommandDeviceCollectionInitializer,
      ],
    }).compile();

    service = module.get<CommandDeviceCollectionInitializer>(
      CommandDeviceCollectionInitializer,
    );
  });

  it('CommandDeviceCollectionInitializer should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize the command-device collection', () => {
    expect(service.getCommandDeviceCollection().get().length).toBe(3);

    expect(
      service
        .getCommandDeviceCollection()
        .get()
        .forEach((commandDevice, index) => {
          expect(commandDevice.getCommandId()).toBe((index + 1).toString());
          expect(commandDevice.getDeviceId()).toBe((index + 1).toString());
        }),
    );
  });
});
