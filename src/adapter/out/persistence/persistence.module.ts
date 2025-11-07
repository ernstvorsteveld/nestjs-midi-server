import { Module } from '@nestjs/common';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { DeviceRepositoryLocal } from './device.repository.local';
@Module({
  providers: [{ provide: DeviceRepository, useClass: DeviceRepositoryLocal }],
})
export class PersistenceModule {}
