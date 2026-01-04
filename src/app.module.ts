import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LightOnOffService } from './domain/service/light.onoff.service';
import { LightOnOffUseCase } from './port/in/light.usecase';
import { LightsFacadeHue } from './adapter/out/hue/hue.facade.hue';
import { LightsPort } from './port/out/lights/lights.port';
import { DeviceRepository } from './port/out/persistence/device.repository';
import { ConfigurationService } from './util/config.service';
import { ConfigurationServiceImpl } from './util/config.service.impl';
import { DeviceRepositoryLocal } from './adapter/out/persistence/device/device.repository.local';
import { CommandRepositoryLocal } from './adapter/out/persistence/command/command.repository.local';
import { CommandRepository } from './port/out/persistence/command.repository';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MidiController } from './adapter/in/http/midi.controller';
import {
  MidiDecoder,
  MidiService0,
  MidiService1,
} from './adapter/in/midi/midi.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [MidiController],
  providers: [
    { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
    { provide: LightOnOffUseCase, useClass: LightOnOffService },
    { provide: DeviceRepository, useClass: DeviceRepositoryLocal },
    LightOnOffService,
    { provide: LightsPort, useClass: LightsFacadeHue },
    { provide: CommandRepository, useClass: CommandRepositoryLocal },
    MidiDecoder,
    MidiService0,
    MidiService1,
  ],
})
export class AppModule {}
