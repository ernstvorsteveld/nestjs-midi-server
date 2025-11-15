import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from 'src/util/config.service';
import { ConfigurationServiceImpl } from 'src/util/config.service.impl';
import { CommandRepository } from 'src/port/out/persistence/command.repository';
import { CommandRepositoryLocal } from './command.repository.local';

describe('CommandRepository', () => {
  let service: CommandRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
        { provide: CommandRepository, useClass: CommandRepositoryLocal },
      ],
    }).compile();

    service = module.get<CommandRepository>(CommandRepository);
  });

  it('CommandRepository should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load json file and have the devices', () => {
    expect(service.getAll().getAll()).toHaveLength(3);

    expect(service.getAll().getAll()[0].commandId).toBe('1');
  });
});
