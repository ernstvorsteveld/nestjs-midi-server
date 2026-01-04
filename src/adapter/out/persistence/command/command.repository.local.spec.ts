import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from 'src/util/config.service';
import { ConfigurationServiceImpl } from 'src/util/config.service.impl';
import { CommandRepository } from 'src/port/out/persistence/command.repository';
import { CommandRepositoryLocal } from './command.repository.local';

describe('CommandRepository', () => {
  let repository: CommandRepository;

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

    repository = module.get<CommandRepository>(CommandRepository);
    repository.onModuleInit();
  });

  it('CommandRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should load json file and have the devices', () => {
    expect(repository.getAll().getAll()).toHaveLength(4);

    expect(repository.getAll().getAll()[0].commandId).toBe('1');
  });
});
