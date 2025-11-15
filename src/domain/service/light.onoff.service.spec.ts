import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { LightOnOffService } from './light.onoff.service';
import { LightsPort } from 'src/port/out/lights/lights.port';
import { OnOffCommand } from '../model/state.commands';
import { LightsFacadeMock } from 'src/adapter/out/hue/hue.facade.mock';
import { Device } from '../model/device.model';
import { LightState } from 'src/adapter/out/hue/hue.model';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { DeviceRepositoryLocal } from 'src/adapter/out/persistence/device/device.repository.local';
import { CommandDeviceCollectionInitializer } from './command.device.collection.service';
import { CommandRepositoryLocal } from 'src/adapter/out/persistence/command/command.repository.local';
import { CommandRepository } from 'src/port/out/persistence/command.repository';

describe('DeviceRepositoryLocal', () => {
  let service: LightOnOffService;
  let mock: LightsPort;
  let repository: DeviceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DeviceRepository, useClass: DeviceRepositoryLocal },
        { provide: CommandRepository, useClass: CommandRepositoryLocal },
        CommandDeviceCollectionInitializer,
        { provide: LightsPort, useClass: LightsFacadeMock },
        LightOnOffService,
      ],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    }).compile();

    service = module.get<LightOnOffService>(LightOnOffService);
    mock = module.get<LightsPort>(LightsPort);
    repository = module.get<DeviceRepository>(DeviceRepository);

    await repository.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mock).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should select correct device based upon command', async () => {
    const onOffCommand: OnOffCommand = {
      buttonId: 'fds',
    };
    (mock as LightsFacadeMock).setLightState(LightState.ON);
    await service.execute(onOffCommand);
    const device: Device = (mock as LightsFacadeMock).getCalledWith();
    expect(device.deviceId).toHaveLength(20);
  });
});
