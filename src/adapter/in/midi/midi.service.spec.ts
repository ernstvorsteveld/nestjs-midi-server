import { Test, TestingModule } from '@nestjs/testing';
import { MidiDecoder, MidiService0, MidiService1 } from './midi.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('MidiService', () => {
  let midiService0: MidiService0;
  let midiService1: MidiService1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [MidiDecoder, MidiService0, MidiService1],
    }).compile();

    midiService0 = module.get<MidiService0>(MidiService0);
    midiService1 = module.get<MidiService1>(MidiService1);
  });

  it('should be defined', () => {
    expect(midiService0).toBeDefined();
    expect(midiService1).toBeDefined();
  });
});
