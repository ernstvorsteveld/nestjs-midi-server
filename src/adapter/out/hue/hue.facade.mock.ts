import { Device } from 'src/domain/model/device.model';
import { LightsPort } from 'src/port/out/lights/lights.port';
import { Light, LightState } from './hue.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LightsFacadeMock implements LightsPort {
  brightness(device: Device): Promise<Light> {
    throw new Error('Method not implemented:' + device.deviceId);
  }
  private devices: Device[] = <Device[]>[];
  private state: LightState;

  flipState(device: Device): Promise<LightState> {
    this.devices.push(device);
    return Promise.resolve(
      this.state === LightState.OFF ? LightState.ON : LightState.OFF,
    );
  }

  setLightState(state: LightState): void {
    this.state = state;
  }

  getCalledWith(): Device {
    return this.devices[0];
  }
}
