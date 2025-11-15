import { CommandCollection } from 'src/domain/model/command.collection.model';

export const CommandRepository = Symbol('CommandRepository');
export interface CommandRepository {
  getAll(): CommandCollection;
}
