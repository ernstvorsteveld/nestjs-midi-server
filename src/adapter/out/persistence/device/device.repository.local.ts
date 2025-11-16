import { Injectable, OnModuleInit } from '@nestjs/common';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { DeviceCollection } from 'src/domain/model/device.collection.model';
import { AbstractDeviceRepositoryLocal } from './device.repository.abstract.local';

@Injectable()
export class DeviceRepositoryLocal
  extends AbstractDeviceRepositoryLocal
  implements DeviceRepository, OnModuleInit
{
  constructor() {
    super();
  }

  async onModuleInit() {
    const deviceMappings = await this.loadDeviceMappings();

    const loadedDevices = deviceMappings.devices.map((device) => ({
      deviceId: device.deviceId,
      name: device.name,
    }));

    new DeviceCollection(loadedDevices);
    console.log('Devices loaded: ', DeviceCollection.get());
  }

  public getAll(): DeviceCollection {
    return DeviceCollection.get();
  }
}
