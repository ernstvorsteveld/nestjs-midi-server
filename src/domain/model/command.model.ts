export class Command {
  commandId: string;
  name: string;

  constructor(commandId: string, name: string) {
    this.commandId = commandId;
    this.name = name;
  }
}
