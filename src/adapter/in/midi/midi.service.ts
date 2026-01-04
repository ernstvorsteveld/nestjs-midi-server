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

  /**
   * Map structure:
   * Key:   number (The Port Index)
   * Value: midi.Input (The actual Object Instance)
   */
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
    this.logger.log('Shutting down MIDI service...');

    this.inputsMap.forEach((inputObject, portNumber) => {
      try {
        this.logger.debug(`Closing port index ${portNumber}`);

        // We call the method on the Object, not the number!
        inputObject.closePort();
      } catch (err) {
        this.logger.error(`Failed to close port ${portNumber}: ${err}`);
      }
    });

    this.inputsMap.clear();
  }

  private initializeAllMidiPorts() {
    const probe = new midi.Input();
    const portCount = probe.getPortCount();

    // Always close the probe instance immediately after counting
    probe.closePort();

    if (portCount === 0) {
      this.logger.warn('No MIDI input devices found!');
      return;
    }

    for (let i = 0; i < portCount; i++) {
      this.setupPort(i);
    }
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

      // Store: Key = Number, Value = Object
      this.inputsMap.set(index, inputInstance);

      this.logger.log(`Port ${index} connected: ${deviceName}`);
    } catch (err) {
      this.logger.error(`Error connecting to port ${index}: ${err}`);
    }
  }
}
