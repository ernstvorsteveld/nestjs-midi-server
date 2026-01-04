import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { LightOnOffService } from './light.onoff.service';
import { LightsPort } from 'src/port/out/lights/lights.port';
import { OnOffCommand } from '../model/state.commands';
import { LightsFacadeMock } from 'src/adapter/out/hue/hue.facade.mock';
import { Device } from '../model/device.model';
import { LightState } from 'src/adapter/out/hue/hue.model';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { CommandRepository } from 'src/port/out/persistence/command.repository';
import { CommandDeviceCollection } from '../model/commanddevice.collection.model';
import {
  CommandRepositoryMock,
  DeviceRepositoryMock,
} from './device.collection.service.mocks';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('LightOnOffService', () => {
  let service: LightOnOffService;
  let mock: LightsPort;
  let repository: DeviceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DeviceRepository, useClass: DeviceRepositoryMock },
        { provide: CommandRepository, useClass: CommandRepositoryMock },
        { provide: LightsPort, useClass: LightsFacadeMock },
        LightOnOffService,
      ],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        EventEmitterModule.forRoot(),
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

  it('Should hava a objects in CommandDeviceCollection', () => {
    expect(CommandDeviceCollection.get().get()).toHaveLength(3);
  });

  it('Should select correct device based upon command', async () => {
    const onOffCommand: OnOffCommand = {
      buttonId: '3',
    };
    (mock as LightsFacadeMock).setLightState(LightState.ON);
    await service.execute(onOffCommand);
    const device: Device = (mock as LightsFacadeMock).getCalledWith();
    expect(device.deviceId).toBe('3');
  });
});
