import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MidiMessage } from '../midi.message.dto';

export class MidiMessageDto {
  buttonId: string;
}

@Controller()
export class MidiController {
  constructor(@Inject() private eventEmitter: EventEmitter2) {}

  @Post('midi/flip')
  @HttpCode(202)
  midi(@Body() midiMessage: MidiMessageDto) {
    console.log('Received request: ', midiMessage);
    this.eventEmitter.emit('midi.command', Mapper.toDomain(midiMessage));
  }
}

class Mapper {
  static toDomain(midiMessageDto: MidiMessageDto): MidiMessage {
    const id: string = midiMessageDto.buttonId;
    return {
      command: id,
      channel: 0,
      note: 0,
      velocity: 0,
      raw: [],
    };
  }
}
