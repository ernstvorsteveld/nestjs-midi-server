import { OnOffCommand } from 'src/domain/model/state.commands';

/**
 * Switch a light status. If the light is turned on, it will turn it off. If the light is off, it will turn it on.
 *
 * @property {OnOffCommand} command: the command containing the id of the button that was pressed.
 */

export interface LightOnOffUseCase {
  execute(command: OnOffCommand): void;
}
