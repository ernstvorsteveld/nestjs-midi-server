import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { LightOnOffService } from './light.onoff.service';
import { LightsPort } from 'src/port/out/lights/lights.port';
import { OnOffCommand } from '../model/state.commands';
import { LightsFacadeMock } from 'src/adapter/out/hue/hue.facade.mock';
import { Device } from '../model/device.model';
import { LightState } from 'src/adapter/out/hue/hue.model';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { DeviceCollection } from '../model/device.collection';
import { DeviceRepositoryLocal } from 'src/adapter/out/persistence/device.repository.local';
import { DeviceCollectionInitializer } from './device.collection.service';

describe('DeviceRepositoryLocal', () => {
  let service: LightOnOffService;
  let mock: LightsPort;
  let repository: DeviceRepository;
  let deviceCollection: DeviceCollection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DeviceRepository, useClass: DeviceRepositoryLocal },
        DeviceCollectionInitializer,
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
    deviceCollection = module.get<DeviceCollection>(DeviceCollection);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mock).toBeDefined();
    expect(repository).toBeDefined();
    expect(deviceCollection).toBeDefined();
  });

  it('Should select correct device based upon command', () => {
    const onOffCommand: OnOffCommand = {
      buttonId: 'fds',
    };
    (mock as LightsFacadeMock).setLightState(LightState.ON);
    service.execute(onOffCommand);
    const device: Device = (mock as LightsFacadeMock).getCalledWith();
    expect(device.deviceId).toHaveLength(20);
  });
});
