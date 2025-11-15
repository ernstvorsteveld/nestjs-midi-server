import { Command } from './command.model';

export class CommandCollection {
  public static COMMAND_COLLECTION: CommandCollection;

  commands: Command[];

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  getAll(): Command[] {
    return this.commands;
  }
}
