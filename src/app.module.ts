import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from './util/config.module';
import { MidiModule } from './adapter/in/midi/midi.module';
import { HueModule } from './adapter/out/hue/hue.module';
import { DeviceCollectionInitializer } from './domain/service/device.collection.service';
import { LightOnOffService } from './domain/service/light.onoff.service';
import { LightOnOffUseCase } from './port/in/light.usecase';
import { PersistenceModule } from './adapter/out/persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UtilModule,
    MidiModule,
    HueModule,
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DeviceCollectionInitializer,
    { provide: LightOnOffUseCase, useClass: LightOnOffService },
  ],
})
export class AppModule {}
