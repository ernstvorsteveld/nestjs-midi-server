import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { input as MidiInput } from 'midi';
import { Subject } from 'rxjs';

// Define a type for our decoded MIDI message for clarity
export interface MidiMessage {
  command: string;
  channel: number;
  note: number;
  velocity: number;
  controller?: number; // For CC messages
  value?: number; // For CC messages
  raw: number[];
}

@Injectable()
export class MidiDecoder {
  public decodeMessage(data: number[]): MidiMessage {
    const [status, data1, data2] = data;
    const commandByte = status & 0xf0;
    // const channel = status & 0x0f;
    const channel = status;
    const command = 'unknown';

    const baseMessage = { channel, raw: data, note: 0, velocity: 0 };

    switch (commandByte) {
      case 0x90: // Note On
        return {
          ...baseMessage,
          command: data2 > 0 ? 'noteon' : 'noteoff',
          note: data1,
          velocity: data2,
        };
      case 0x80: // Note Off
        return {
          ...baseMessage,
          command: 'noteoff',
          note: data1,
          velocity: data2,
        };
      case 0xb0: // Control Change (CC)
        return {
          ...baseMessage,
          command: 'cc',
          controller: data1,
          value: data2,
          note: 0,
          velocity: 0,
        };
      default:
        return { ...baseMessage, command };
    }
  }
}

@Injectable()
export class MidiService0 implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MidiService0.name);
  private readonly midiInput = new MidiInput();

  constructor(private readonly midiMessageDecoder: MidiDecoder) {}

  // An RxJS Subject to stream MIDI messages to subscribers
  public readonly message$ = new Subject<MidiMessage>();

  onModuleInit() {
    this.initializeMidi();
  }

  onModuleDestroy() {
    this.logger.log('Closing MIDI port...');
    this.midiInput.closePort();
  }

  private initializeMidi() {
    const portCount = this.midiInput.getPortCount();
    this.logger.debug('Number of ports found: ' + portCount);
    if (portCount === 0) {
      this.logger.warn('No MIDI input devices found!');
      return;
    }

    const deviceName = this.midiInput.getPortName(0);
    this.logger.log(`Found MIDI Device: ${deviceName}. Opening port 0.`);

    // Listen for MIDI messages
    this.midiInput.on('message', (deltaTime, message) => {
      // The message is an array of numbers [status, data1, data2]
      const decodedMessage = this.midiMessageDecoder.decodeMessage(message);
      this.logger.verbose(`MIDI Message: ${JSON.stringify(decodedMessage)}`);

      // Push the decoded message to our RxJS stream
      this.message$.next(decodedMessage);
    });

    // Open the first available MIDI port.
    this.midiInput.openPort(0);
  }
}

@Injectable()
export class MidiService1 implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MidiService0.name);
  private readonly midiInput = new MidiInput();

  constructor(private readonly midiMessageDecoder: MidiDecoder) {}

  // An RxJS Subject to stream MIDI messages to subscribers
  public readonly message$ = new Subject<MidiMessage>();

  onModuleInit() {
    this.initializeMidi();
  }

  onModuleDestroy() {
    this.logger.log('Closing MIDI port...');
    this.midiInput.closePort();
  }

  private initializeMidi() {
    const portCount = this.midiInput.getPortCount();
    if (portCount === 0) {
      this.logger.warn('No MIDI input devices found!');
      return;
    }

    const deviceName = this.midiInput.getPortName(1);
    this.logger.log(`Found MIDI Device: ${deviceName}. Opening port 0.`);

    // Listen for MIDI messages
    this.midiInput.on('message', (deltaTime, message) => {
      // The message is an array of numbers [status, data1, data2]
      const decodedMessage = this.midiMessageDecoder.decodeMessage(message);
      this.logger.verbose(`MIDI Message: ${JSON.stringify(decodedMessage)}`);

      // Push the decoded message to our RxJS stream
      this.message$.next(decodedMessage);
    });

    // Open the first available MIDI port.
    this.midiInput.openPort(1);
  }
}
