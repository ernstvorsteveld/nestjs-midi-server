import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { Device } from 'src/domain/model/device.model';
import {
  HueDimmingStatus,
  HueLight,
  HueLightUpdatePayload,
  Light,
  LightState,
} from './hue.model';
import { ConfigurationService } from 'src/util/config.service';
import { LightsPort } from 'src/port/out/lights/lights.port';

@Injectable()
export class LightsFacadeHue implements LightsPort {
  private readonly config: AxiosRequestConfig;
  private readonly configurationService: ConfigurationService;

  constructor(
    @Inject(ConfigurationService)
    configurationService: ConfigurationService,
  ) {
    this.configurationService = configurationService;

    this.config = {
      headers: {
        'Content-Type': 'application/json',
        'hue-application-key': configurationService.hueAuthnkey(),
      },
    };
  }

  async brightness(device: Device): Promise<Light> {
    const currentBrightness: HueDimmingStatus = await this.getDimmingStatus(
      device.deviceId,
    );
    const uri = `${this.configurationService.hueHost()}/clip/v2/resource/light/${device.deviceId}`;
    const body: HueLightUpdatePayload = {
      dimming: {
        brightness: currentBrightness.brightness,
      },
    };
    try {
      await axios.put(uri, body, this.config);
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve(newState);
  }

  async flipState(device: Device): Promise<LightState> {
    const currentState = await this.getLightStatus(device.deviceId);
    const newState =
      currentState === LightState.ON ? LightState.OFF : LightState.ON;

    const uri = `${this.configurationService.hueHost()}/clip/v2/resource/light/${device.deviceId}`;
    const body: HueLightUpdatePayload = {
      on: {
        on: newState === LightState.ON,
      },
    };

    try {
      await axios.put(uri, body, this.config);
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve(newState);
  }

  private isEmpty(o: any) {
    return Object.keys(o).length === 0;
  }

  private async getLightStatus(id: string): Promise<LightState> {
    const light: HueLight = await this.getLampState(id);
    try {
      if (this.isEmpty(light)) {
        return LightState.OFF;
      }
      const state: boolean = light.on.on;
      return state ? LightState.ON : LightState.OFF;
    } catch (error) {
      console.error(error);
      return LightState.OFF;
    }
  }

  private async getDimmingStatus(id: string): Promise<HueDimmingStatus> {
    const light = await this.getLampState(id);
    try {
      if (this.isEmpty(light)) {
        return { brightness: 0 } as HueDimmingStatus;
      }
      return { brightness: light.dimming?.brightness } as HueDimmingStatus;
    } catch (error) {
      console.error(error);
      return { brightness: 0 } as HueDimmingStatus;
    }
  }

  private async getLampState(id: string): Promise<HueLight> {
    const uri = `${this.configurationService.hueHost()}/clip/v2/resource/light/${id}`;
    console.error(uri);
    const response = await axios.get(uri, this.config);
    if (response === undefined || response.status !== 200) {
      return Promise.resolve({} as HueLight);
    }
    const lights: HueLight[] = response.data as HueLight[];
    return lights[0];
  }
}
