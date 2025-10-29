import { DeviceCollection } from 'src/domain/model/device.model';

export interface DeviceRepository {
  load(): void;
  getAll(): DeviceCollection;
}
