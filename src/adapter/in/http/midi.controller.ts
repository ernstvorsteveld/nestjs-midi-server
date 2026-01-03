import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MidiMessage } from '../midi.message.dto';

export class MidiMessageDto {
  buttonId: string;
}

@Controller()
export class MidiController {
  constructor(@Inject() private eventEmitter: EventEmitter2) {}

  @Post('midi')
  @HttpCode(202)
  midi(@Body() midiMessage: MidiMessageDto) {
    this.eventEmitter.emit('midi.command', Mapper.toDomain(midiMessage));
  }
}

class Mapper {
  static toDomain(midiMessageDto: MidiMessageDto): MidiMessage {
    return {
      command: midiMessageDto.buttonId,
      channel: 0,
      note: 0,
      velocity: 0,
      raw: [],
    };
  }
}
