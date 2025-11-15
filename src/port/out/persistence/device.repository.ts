import { OnModuleInit } from '@nestjs/common';
import { DeviceCollection } from 'src/domain/model/device.collection.model';

export const DeviceRepository = Symbol('DeviceRepository');
export interface DeviceRepository extends OnModuleInit {
  getAll(): DeviceCollection;
}
