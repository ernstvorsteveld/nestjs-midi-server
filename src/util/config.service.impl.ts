import { ConfigService } from '@nestjs/config';
import { ConfigurationService } from './config.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationServiceImpl implements ConfigurationService {
  private hueAuthnKey: string;
  private hueBridgeHost: string;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.hueBridgeHost = configService.get<string>(
      'HUE_BRIDGE_HOST',
      'no-host-ip-configured',
    );
    this.hueAuthnKey = configService.get<string>(
      'HUE_APPLICATION_KEY',
      'no-hue-application-key-configured',
    );
  }

  hueHost(): string {
    return this.hueBridgeHost;
  }

  hueAuthnkey(): string {
    return this.hueAuthnKey;
  }
}
