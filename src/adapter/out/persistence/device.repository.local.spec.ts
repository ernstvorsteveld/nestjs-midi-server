import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { LightOnOffService } from 'src/domain/service/light.onoff.service';
import { LightsPort } from 'src/port/out/lights/lights.port';
import { LightsFacadeHue } from '../hue/hue.facade.hue';
import { DeviceCollectionInitializer } from 'src/domain/service/device.collection.service';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { DeviceRepositoryLocal } from './device.repository.local';
import { ConfigurationService } from 'src/util/config.service';
import { ConfigurationServiceImpl } from 'src/util/config.service.impl';

describe('LightOnOffService', () => {
  let service: LightOnOffService;
  let deviceCollectionInitializer: DeviceCollectionInitializer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
        { provide: DeviceRepository, useClass: DeviceRepositoryLocal },
        DeviceCollectionInitializer,
        { provide: LightsPort, useClass: LightsFacadeHue },
        LightOnOffService,
      ],
    }).compile();

    service = module.get<LightOnOffService>(LightOnOffService);
    deviceCollectionInitializer = module.get<DeviceCollectionInitializer>(
      DeviceCollectionInitializer,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load json file and have the devices', () => {
    expect(deviceCollectionInitializer.get().get()).toHaveLength(3);
  });
});
