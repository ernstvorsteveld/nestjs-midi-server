import { Test, TestingModule } from '@nestjs/testing';
import { DeviceRepositoryLocal } from './device.repository.local';
import { ConfigModule } from '@nestjs/config';
import { DeviceCollection } from 'src/domain/model/device.model';

describe('DeviceRepositoryLocal', () => {
  let repository: DeviceRepositoryLocal;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceRepositoryLocal],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    }).compile();

    repository = module.get<DeviceRepositoryLocal>(DeviceRepositoryLocal);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should load json file and have the devices', () => {
    repository.getAll();
    expect(DeviceCollection.get().length).toEqual(3);
  });
});
