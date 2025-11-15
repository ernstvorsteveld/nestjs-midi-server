import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { DeviceRepositoryLocal } from './device.repository.local';
import { ConfigurationService } from 'src/util/config.service';
import { ConfigurationServiceImpl } from 'src/util/config.service.impl';

describe('DeviceRepository', () => {
  let service: DeviceRepositoryLocal;

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
      ],
    }).compile();

    service = module.get<DeviceRepositoryLocal>(DeviceRepositoryLocal);
    await service.onModuleInit();
  });

  it('DeviceRepository should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load json file and have the devices', () => {
    expect(service.getAll().getAll()).toHaveLength(23);
    expect(service.getAll().getAll()[0].deviceId).toBe(
      'getDeviceId - unknown - 2',
    );
  });
});
