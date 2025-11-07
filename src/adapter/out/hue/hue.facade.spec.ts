import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { LightsFacadeHue } from './hue.facade.hue';
import { Device } from 'src/domain/model/device.model';
import { LightState } from './hue.model';

describe('MidiService', () => {
  let facade: LightsFacadeHue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightsFacadeHue],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    }).compile();

    facade = module.get<LightsFacadeHue>(LightsFacadeHue);
  });

  it('should be defined', () => {
    expect(facade).toBeDefined();
  });

  it('should get state of a light', async () => {
    const id = '0018a92e-ba65-4ea3-8abf-91043a1f4b1c';
    const state: LightState = await facade.getState(id);
    expect(state).toBeDefined();
  });

  it('should set light on', async () => {
    const currentState: LightState = await facade.getState(
      '0018a92e-ba65-4ea3-8abf-91043a1f4b1c',
    );
    const device: Device = {
      commandId: '0018a92e-ba65-4ea3-8abf-91043a1f4b1c',
      deviceId: '0018a92e-ba65-4ea3-8abf-91043a1f4b1c',
      name: 'Example value',
    };

    const response = (await facade.flipState(device)) as number;
    expect(response).toBe(
      currentState === LightState.ON ? LightState.OFF : LightState.ON,
    );
  });

  it(`should get getStateValue`, async () => {});
});
