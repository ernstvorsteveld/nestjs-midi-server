import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { Device } from 'src/domain/model/device.model';
import { HueApiResponse, HueLightUpdatePayload, LightState } from './hue.model';
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

  async flipState(device: Device): Promise<LightState> {
    const currentState = await this.getState(device.deviceId);
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

  async getState(id: string): Promise<LightState> {
    const uri = `${this.configurationService.hueHost()}/clip/v2/resource/light/${id}`;
    console.error(uri);
    const response = await axios.get(uri, this.config);
    if (response === undefined || response.status !== 200) {
      return LightState.OFF;
    }
    try {
      if (response.data === undefined) {
        return LightState.OFF;
      }
      const light: HueApiResponse = response.data as HueApiResponse;
      const state: boolean = light.data[0].on.on;
      return state ? LightState.ON : LightState.OFF;
    } catch (error) {
      console.error(error);
      return LightState.OFF;
    }
  }
}
