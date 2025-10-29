import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import { Device } from 'src/domain/model/device.model';
import { LightsFacade } from 'src/port/out/lights/lights.facade';
import { HueApiResponse, HuePowerupOn, LightState } from './hue.model';

@Injectable()
export class LightsFacadeHue implements LightsFacade {
  private readonly hueBridgeUrl: string;
  private readonly config: AxiosRequestConfig;

  constructor(configService: ConfigService) {
    this.hueBridgeUrl = configService.get<string>('HUE_BRIDGE_HOST', 'foutje');

    this.config = {
      headers: {
        'Content-Type': 'application/json',
        'hue-application-key': configService.get<string>(
          'HUE_APPLICATION_KEY',
          '',
        ),
      },
    };
  }

  async flipState(device: Device): Promise<LightState> {
    const currentState = await this.getState(device.deviceId);
    const newState =
      currentState === LightState.ON ? LightState.OFF : LightState.ON;

    const uri = `${this.hueBridgeUrl}/clip/v2/resource/light/${device.deviceId}`;
    const body: HuePowerupOn = {
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
    const uri = `${this.hueBridgeUrl}/clip/v2/resource/light/${id}`;
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
