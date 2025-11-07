import { Module } from '@nestjs/common';
import { MidiDecoder, MidiService0, MidiService1 } from './midi.service';
@Module({
  providers: [MidiDecoder, MidiService0, MidiService1],
})
export class MidiModule {}
