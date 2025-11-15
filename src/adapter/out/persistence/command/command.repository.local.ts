import { Injectable } from '@nestjs/common';
import { CommandRepository } from 'src/port/out/persistence/command.repository';
import { CommandCollection } from 'src/domain/model/command.collection.model';
import { CommandCollectionDto } from './command.model';
import { AbstractCommandRepositoryLocal } from './command.repository.abstract.local';

@Injectable()
export class CommandRepositoryLocal
  extends AbstractCommandRepositoryLocal
  implements CommandRepository
{
  private commandCollection: CommandCollection;

  constructor() {
    super();
    const commandsCollection: CommandCollectionDto = this.loadCommands();
    this.commandCollection = new CommandCollection(
      commandsCollection.commands.map((d) => ({
        commandId: d.commandId,
        name: d.name,
      })),
    );
  }

  public getAll(): CommandCollection {
    return this.commandCollection;
  }
}
