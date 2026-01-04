import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MidiDecoder } from './midi.decoder';
import { MidiService } from './midi.service';

describe('MidiService', () => {
  let midiService: MidiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [MidiDecoder, MidiService],
    }).compile();

    midiService = module.get<MidiService>(MidiService);
  });

  it('should be defined', () => {
    expect(midiService).toBeDefined();
  });
});
