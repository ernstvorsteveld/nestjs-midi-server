import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { DeviceRepositoryLocal } from './device.repository.local';
import { ConfigurationService } from 'src/util/config.service';
import { ConfigurationServiceImpl } from 'src/util/config.service.impl';
import { Device } from 'src/domain/model/device.model';

describe('DeviceRepository', () => {
  let repository: DeviceRepositoryLocal;

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

    repository = module.get<DeviceRepositoryLocal>(DeviceRepositoryLocal);
    await repository.onModuleInit();
  });

  it('DeviceRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should load json file and have the devices', () => {
    expect(repository.getAll().getAll()).toHaveLength(23);
    expect(repository.getAll().getAll()[0].deviceId).toBe(
      'getDeviceId - unknown - 2',
    );
  });

  it('should have witte lamp by id', () => {
    const device: Device = repository
      .getAll()
      .findById('0018a92e-ba65-4ea3-8abf-91043a1f4b1c');
    expect(device).toBeDefined();
    expect(device.deviceId).toBe('0018a92e-ba65-4ea3-8abf-91043a1f4b1c');
    expect(device.name).toBe('Witte kleine lamp');
  });
});
