import { DeviceCollection } from 'src/domain/model/device.collection.model';

export const DeviceRepository = Symbol('DeviceRepository');
export interface DeviceRepository {
  getAll(): DeviceCollection;
}
