import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LightOnOffService } from './domain/service/light.onoff.service';
import { LightOnOffUseCase } from './port/in/light.usecase';
import { LightsFacadeHue } from './adapter/out/hue/hue.facade.hue';
import { LightsPort } from './port/out/lights/lights.port';
import { DeviceRepository } from './port/out/persistence/device.repository';
import { ConfigurationService } from './util/config.service';
import { ConfigurationServiceImpl } from './util/config.service.impl';
import { DeviceRepositoryLocal } from './adapter/out/persistence/device/device.repository.local';
import { CommandDeviceCollectionInitializer } from './domain/service/command.device.collection.service';
import { CommandRepositoryLocal } from './adapter/out/persistence/command/command.repository.local';
import { CommandRepository } from './port/out/persistence/command.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
    AppService,
    CommandDeviceCollectionInitializer,
    { provide: LightOnOffUseCase, useClass: LightOnOffService },
    { provide: LightsPort, useClass: LightsFacadeHue },
    { provide: DeviceRepository, useClass: DeviceRepositoryLocal },
    { provide: LightsPort, useClass: LightsFacadeHue },
    LightOnOffService,
    { provide: LightsPort, useClass: LightsFacadeHue },
    { provide: CommandRepository, useClass: CommandRepositoryLocal },
  ],
})
export class AppModule {}
