import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { DeviceRepositoryLocal } from 'src/adapter/out/persistence/device/device.repository.local';
import { ConfigurationService } from 'src/util/config.service';
import { ConfigurationServiceImpl } from 'src/util/config.service.impl';
import { CommandDeviceCollection } from './commanddevice.collection.model';
import { DeviceCollection } from './device.collection.model';
import { Device } from './device.model';
import { CommandRepositoryLocal } from 'src/adapter/out/persistence/command/command.repository.local';

describe('LightOnOffService', () => {
  let deviceRepository: DeviceRepositoryLocal;
  let commandRepository: CommandRepositoryLocal;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
        { provide: DeviceRepositoryLocal, useClass: DeviceRepositoryLocal },
        { provide: CommandRepositoryLocal, useClass: CommandRepositoryLocal },
      ],
    }).compile();

    deviceRepository = module.get<DeviceRepositoryLocal>(DeviceRepositoryLocal);
    await deviceRepository.onModuleInit();
    commandRepository = module.get<CommandRepositoryLocal>(
      CommandRepositoryLocal,
    );
    commandRepository.onModuleInit();
  });

  it('should be defined', () => {
    expect(deviceRepository).toBeDefined();
  });

  it('Should hava a objects in CommandDeviceCollection', () => {
    expect(CommandDeviceCollection.get().get()).toHaveLength(18);
  });

  it('Should select correct device based upon deviceId', () => {
    const device: Device = DeviceCollection.get().findById(
      '0018a92e-ba65-4ea3-8abf-91043a1f4b1c',
    );
    expect(device.name).toBe('Witte kleine lamp');
  });

  it('Should select correct device based upon commandId', () => {
    const device = CommandDeviceCollection.get().getDeviceForCommand('64');
    expect(device.deviceId).toBe('0018a92e-ba65-4ea3-8abf-91043a1f4b1c');
  });
});
