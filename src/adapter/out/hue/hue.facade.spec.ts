import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { LightsFacadeHue } from './hue.facade.hue';
import { Device } from 'src/domain/model/device.model';
import { LightState } from './hue.model';
import { ConfigurationService } from 'src/util/config.service';
import { ConfigurationServiceImpl } from 'src/util/config.service.impl';

describe('MidiService', () => {
  let facade: LightsFacadeHue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
        LightsFacadeHue,
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
