import { Light, LightState } from 'src/adapter/out/hue/hue.model';
import { Device } from 'src/domain/model/device.model';

export const LightsPort = Symbol('LightsPort');
export interface LightsPort {
  flipState(device: Device): Promise<LightState>;

  brightness(device: Device): Promise<Light>;
}
