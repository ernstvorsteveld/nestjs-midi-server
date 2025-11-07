import { Module } from '@nestjs/common';
import { LightsPort } from 'src/port/out/lights/lights.port';
import { LightsFacadeHue } from './hue.facade.hue';
@Module({
  providers: [{ provide: LightsPort, useClass: LightsFacadeHue }],
})
export class HueModule {}
