import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from './config.service';
import { ConfigurationServiceImpl } from './config.service.impl';
import { ConfigModule } from '@nestjs/config';

describe('ConfigurationServiceImpl', () => {
  let service: ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
      ],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    }).compile();

    service = module.get<ConfigurationService>(ConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should read property HUE_BRIDGE_HOST', () => {
    expect(service.hueHost()).toHaveLength(20);
  });

  it('should read property HUE_APPLICATION_KEY', () => {
    expect(service.hueAuthnkey()).toHaveLength(40);
  });
});
