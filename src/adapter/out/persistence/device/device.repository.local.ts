import { Injectable, OnModuleInit } from '@nestjs/common';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { DeviceCollection } from 'src/domain/model/device.collection.model';
import { AbstractDeviceRepositoryLocal } from './device.repository.abstract.local';

@Injectable()
export class DeviceRepositoryLocal
  extends AbstractDeviceRepositoryLocal
  implements DeviceRepository, OnModuleInit
{
  private devices: DeviceCollection;

  constructor() {
    super();
    this.devices = new DeviceCollection([]);
  }

  async onModuleInit() {
    const deviceMappings = await this.loadDeviceMappings();

    const loadedDevices = deviceMappings.devices.map((device) => ({
      deviceId: device.deviceId,
      name: device.name,
    }));

    this.devices = new DeviceCollection(loadedDevices);
    console.log('Devices loaded: ', this.devices);
  }

  public getAll(): DeviceCollection {
    return this.devices;
  }
}
