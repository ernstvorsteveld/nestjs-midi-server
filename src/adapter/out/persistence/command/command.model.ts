export type CommandMappingDtoCollection = {
  commandMappings: CommandMappingDto[];
};

export type CommandMappingDto = {
  commandId: string;
  lightId: string;
  name: string;
};

export type CommandDtoCollection = CommandDto[];

export type CommandDto = {
  commandId: string;
  deviceId: string;
  name: string;
};

export type CommandCollectionDto = {
  commands: CommandDto[];
};
