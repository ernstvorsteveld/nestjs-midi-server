import { Command } from './command.model';

export class CommandCollection {
  private static INSTANCE: CommandCollection;

  commands: Command[];

  constructor(commands: Command[]) {
    this.commands = commands;
    CommandCollection.INSTANCE = this;
  }

  public static get(): CommandCollection {
    return CommandCollection.INSTANCE;
  }

  getAll(): Command[] {
    return this.commands;
  }
}
