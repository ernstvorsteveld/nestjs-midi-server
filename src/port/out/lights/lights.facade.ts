import { LightState } from 'src/adapter/hue/hue.model';
import { Device } from 'src/domain/model/device.model';

export interface LightsFacade {
  flipState(device: Device): Promise<LightState>;
}
