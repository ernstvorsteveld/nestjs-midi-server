import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import * as midi from 'midi';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MidiDecoder } from './midi.decoder';

@Injectable()
export class MidiService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MidiService.name);
  private readonly inputsMap: Map<number, midi.Input> = new Map();

  constructor(
    @Inject(MidiDecoder)
    private readonly midiMessageDecoder: MidiDecoder,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  onModuleInit() {
    this.initializeAllMidiPorts();
  }

  onModuleDestroy() {
    this.logger.log('About to destroy: Closing all MIDI ports.');
    this.inputsMap.forEach((inputObject, portNumber) => {
      try {
        this.logger.debug(`Closing port index ${portNumber}`);
        inputObject.closePort();
      } catch (err) {
        this.logger.error(`Failed to close port ${portNumber}: ${err}`);
      }
    });

    this.inputsMap.clear();
  }

  private initializeAllMidiPorts() {
    const portCount = this.getPortCount();
    if (portCount === 0) {
      this.logger.warn('No MIDI input devices found!');
      return;
    }
    this.setupPorts(portCount);
  }

  private setupPorts(portCount: number) {
    for (let i = 0; i < portCount; i++) {
      this.setupPort(i);
    }
  }

  private getPortCount() {
    const probe = new midi.Input();
    const count = probe.getPortCount();
    probe.closePort();
    return count;
  }

  private setupPort(index: number) {
    try {
      const inputInstance = new midi.Input();
      const deviceName = inputInstance.getPortName(index);

      inputInstance.on('message', (deltaTime, message) => {
        const decodedMessage = this.midiMessageDecoder.decodeMessage(message);

        if (decodedMessage.command === 'noteon') {
          this.eventEmitter.emit('midi.command', decodedMessage);
        }
      });

      inputInstance.openPort(index);
      this.inputsMap.set(index, inputInstance);
      this.logger.log(`Port ${index} connected: ${deviceName}`);
    } catch (err) {
      this.logger.error(`Error connecting to port ${index}: ${err}`);
    }
  }
}
