import { DeviceCollection } from 'src/domain/model/device.model';

export interface DeviceRepository {
  getAll(): DeviceCollection;
}
