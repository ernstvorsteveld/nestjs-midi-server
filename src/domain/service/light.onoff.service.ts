import { LightOnOffUseCase } from 'src/port/in/light.usecase';
import { OnOffCommand } from '../model/state.commands';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Device } from '../model/device.model';
import { LightsPort } from 'src/port/out/lights/lights.port';
import { DeviceCollection } from '../model/device.collection';
import { DeviceCollectionInitializer } from './device.collection.service';

@Injectable()
export class LightOnOffService implements LightOnOffUseCase {
  private readonly logger = new Logger(LightOnOffService.name);
  private readonly port: LightsPort;
  private readonly deviceCollection: DeviceCollection;

  constructor(
    @Inject(LightsPort) port: LightsPort,
    @Inject(DeviceCollectionInitializer)
    initializer: DeviceCollectionInitializer,
  ) {
    this.port = port;
    this.deviceCollection = initializer.get();
  }

  async execute(command: OnOffCommand): Promise<void> {
    const device: Device = this.deviceCollection.findById(command.buttonId);
    await this.port.flipState(device);
    return Promise.resolve();
  }
}
