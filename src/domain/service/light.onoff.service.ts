import { LightOnOffUseCase } from 'src/port/in/light.usecase';
import { OnOffCommand } from '../model/state.commands';
import { Injectable, Logger } from '@nestjs/common';
import { Device, DeviceCollection } from '../model/device.model';
import { LightsFacade } from 'src/port/out/lights/lights.facade';

@Injectable()
export class LightOnOffService implements LightOnOffUseCase {
  private readonly logger = new Logger(LightOnOffService.name);
  private readonly facade: LightsFacade;

  constructor(facade: LightsFacade) {
    this.facade = facade;
  }

  execute(command: OnOffCommand): void {
    const device: Device = DeviceCollection.findById(command.buttonId);
    this.facade.flipState(device);
  }
}
