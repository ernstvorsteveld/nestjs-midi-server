import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './config.service';
import { ConfigurationServiceImpl } from './config.service.impl';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
  ],
})
export class UtilModule {}
