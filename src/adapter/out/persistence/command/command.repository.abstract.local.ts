import * as path from 'path';
import * as fs from 'fs';
import {
  CommandMappingDto,
  CommandDto,
  CommandMappingDtoCollection,
  CommandCollectionDto,
} from './command.model';

export abstract class AbstractCommandRepositoryLocal {
  static EMPTY_COMMAND_MAPPING_DTO_COLLECTION = {
    commandMappings: <CommandMappingDto[]>[],
  };
  static EMTPY_COMMAND_DTO_COLLECTION = { commands: <CommandDto[]>[] };

  loadDeviceMappings(): CommandMappingDtoCollection {
    try {
      const commandCollection: CommandCollectionDto = this.loadCommands();
      return {
        commandMappings: commandCollection.commands.map((d) => ({
          commandId: d.commandId,
          lightId: d.deviceId,
          name: d.name,
        })),
      };
    } catch (e) {
      console.log(e);
    }
    return AbstractCommandRepositoryLocal.EMPTY_COMMAND_MAPPING_DTO_COLLECTION;
  }

  private readFileCwd(file: string): string {
    try {
      return fs.readFileSync(path.join(process.cwd(), file), 'utf8');
    } catch (e) {
      console.log('Could not read file', e);
    }
    return '';
  }

  loadCommands(): CommandCollectionDto {
    try {
      const fc: string = this.readFileCwd('.device_info/device-mappings.json');
      return { commands: JSON.parse(fc) as CommandDto[] };
    } catch (e) {
      console.log(e);
    }
    return AbstractCommandRepositoryLocal.EMTPY_COMMAND_DTO_COLLECTION;
  }
}
