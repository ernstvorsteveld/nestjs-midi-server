import { Injectable } from '@nestjs/common';
import { DeviceCollection } from 'src/domain/model/device.collection';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import {
  AbstractDeviceRepositoryLocal,
  DeviceMappingDtoCollection,
} from './device.repository.abstract.local';

@Injectable()
export class DeviceRepositoryLocal
  extends AbstractDeviceRepositoryLocal
  implements DeviceRepository
{
  private devices: DeviceCollection;

  constructor() {
    super();
    const deviceMappingDtoCollection: DeviceMappingDtoCollection =
      this.loadDeviceMappings();
    this.devices = new DeviceCollection(
      deviceMappingDtoCollection.deviceMappings.map((d) => ({
        commandId: d.buttonId,
        deviceId: d.lightId,
        name: d.name,
      })),
    );
  }

  public getAll(): DeviceCollection {
    return this.devices;
  }
}
