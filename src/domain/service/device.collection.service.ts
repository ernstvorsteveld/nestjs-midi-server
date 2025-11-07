import { Inject, Injectable } from '@nestjs/common';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';
import { DeviceCollection } from '../model/device.collection';

@Injectable()
export class DeviceCollectionInitializer {
  private readonly repository: DeviceRepository;
  private deviceCollection: DeviceCollection;

  constructor(@Inject(DeviceRepository) repository: DeviceRepository) {
    this.repository = repository;
    this.execute();
  }

  execute(): void {
    this.deviceCollection = this.repository.getAll();
  }

  get(): DeviceCollection {
    return this.deviceCollection;
  }
}
