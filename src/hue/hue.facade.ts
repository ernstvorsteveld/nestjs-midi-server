import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export type Light = {
  id: string;
  name: string;
  state: {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: string;
    xy: string[];
    ct: number;
    alert: string;
    colormode: string;
    reachable: boolean;
  };
};

export type LightStatusRequest = {
  on: {
    on: boolean;
  };
};

@Injectable()
export class HueLightHttpAdapter {
  private readonly hueApplicationKey: string;
  private readonly hueBridgeUrl: string;

  constructor(configService: ConfigService) {
    this.hueApplicationKey = configService.get<string>(
      'HUE_APPLICATION_KEY',
      '',
    );
    this.hueBridgeUrl = configService.get<string>('HUE_BRIDGE_HOST', '');
  }

  async setStatus(light: Light): Promise<any> {
    const uri = `${this.hueBridgeUrl}/clip/v2/resource/light/${light.id}`;
    const body: LightStatusRequest = {
      on: {
        on: light.state.on,
      },
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'hue-application-key': this.hueApplicationKey,
      },
    };

    try {
      const response = await axios.put(uri, body, config);
      return response.status;
    } catch (error) {
      console.error(error);
    }
  }
}
