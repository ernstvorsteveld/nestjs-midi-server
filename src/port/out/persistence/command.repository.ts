import { OnModuleInit } from '@nestjs/common';
import { CommandCollection } from 'src/domain/model/command.collection.model';

export const CommandRepository = Symbol('CommandRepository');
export interface CommandRepository extends OnModuleInit {
  getAll(): CommandCollection;
}
