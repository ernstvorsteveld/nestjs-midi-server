import { DeviceCollection } from 'src/domain/model/device.collection';

export const DeviceRepository = Symbol('DeviceRepository');
export interface DeviceRepository {
  getAll(): DeviceCollection;
}
