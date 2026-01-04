import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { LightOnOffService } from './light.onoff.service';
import { LightsPort } from 'src/port/out/lights/lights.port';
import { OnOffCommand } from '../model/state.commands';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { CommandRepository } from 'src/port/out/persistence/command.repository';
import { CommandDeviceCollection } from '../model/commanddevice.collection.model';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DeviceRepositoryLocal } from 'src/adapter/out/persistence/device/device.repository.local';
import { CommandRepositoryLocal } from 'src/adapter/out/persistence/command/command.repository.local';
import { LightsFacadeHue } from 'src/adapter/out/hue/hue.facade.hue';
import { ConfigurationService } from 'src/util/config.service';
import { ConfigurationServiceImpl } from 'src/util/config.service.impl';

describe('LightOnOffService', () => {
  let service: LightOnOffService;
  let lightsPort: LightsPort;
  let deviceRepository: DeviceRepository;
  let commandRepository: CommandRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
        { provide: DeviceRepository, useClass: DeviceRepositoryLocal },
        { provide: CommandRepository, useClass: CommandRepositoryLocal },
        { provide: LightsPort, useClass: LightsFacadeHue },
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
    lightsPort = module.get<LightsPort>(LightsPort);
    deviceRepository = module.get<DeviceRepository>(DeviceRepository);
    commandRepository = module.get<CommandRepository>(CommandRepository);

    await deviceRepository.onModuleInit();
    commandRepository.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(lightsPort).toBeDefined();
    expect(deviceRepository).toBeDefined();
  });

  it('Should hava a objects in CommandDeviceCollection', () => {
    expect(CommandDeviceCollection.get().get()).toHaveLength(23);
  });

  it('Should select correct device based upon command', async () => {
    const onOffCommand: OnOffCommand = {
      buttonId: '64',
    };
    await service.execute(onOffCommand);
  });
});
