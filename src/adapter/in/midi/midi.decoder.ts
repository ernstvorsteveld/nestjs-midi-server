import { Injectable } from '@nestjs/common';
import { MidiMessage } from '../midi.message.dto';

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
