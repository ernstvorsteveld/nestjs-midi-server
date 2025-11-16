import { LightOnOffUseCase } from 'src/port/in/light.usecase';
import { OnOffCommand } from '../model/state.commands';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { LightsPort } from 'src/port/out/lights/lights.port';
import { CommandDeviceCollection } from '../model/commanddevice.collection.model';

@Injectable()
export class LightOnOffService implements LightOnOffUseCase {
  private readonly logger = new Logger(LightOnOffService.name);
  private readonly port: LightsPort;

  constructor(@Inject(LightsPort) port: LightsPort) {
    this.port = port;
  }

  async execute(command: OnOffCommand): Promise<void> {
    const commandDevice = CommandDeviceCollection.get().getDeviceForCommand(
      command.buttonId,
    );
    if (commandDevice === undefined) {
      console.info(`Device not found for command ${command.buttonId}`);
    } else {
      await this.port.flipState({
        deviceId: commandDevice.deviceId,
        name: 'unknown at this moment',
      });
    }
    return Promise.resolve();
  }
}
