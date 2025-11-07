import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from './util/config.module';
import { MidiModule } from './adapter/in/midi/midi.module';
import { DeviceCollectionInitializer } from './domain/service/device.collection.service';
import { LightOnOffService } from './domain/service/light.onoff.service';
import { LightOnOffUseCase } from './port/in/light.usecase';
import { PersistenceModule } from './adapter/out/persistence/persistence.module';
import { LightsFacadeHue } from './adapter/out/hue/hue.facade.hue';
import { LightsPort } from './port/out/lights/lights.port';
import { DeviceRepositoryLocal } from './adapter/out/persistence/device.repository.local';
import { DeviceRepository } from './port/out/persistence/device.repository';
import { ConfigurationService } from './util/config.service';
import { ConfigurationServiceImpl } from './util/config.service.impl';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UtilModule,
    MidiModule,
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
    AppService,
    DeviceCollectionInitializer,
    { provide: LightOnOffUseCase, useClass: LightOnOffService },
    { provide: LightsPort, useClass: LightsFacadeHue },
    { provide: DeviceRepository, useClass: DeviceRepositoryLocal },
    DeviceCollectionInitializer,
    { provide: LightsPort, useClass: LightsFacadeHue },
    LightOnOffService,
  ],
})
export class AppModule {}
