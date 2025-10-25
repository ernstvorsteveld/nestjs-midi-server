import { Test, TestingModule } from '@nestjs/testing';
import { HueLightHttpAdapter, Light } from './hue.facade';
import { ConfigModule } from '@nestjs/config';

describe('MidiService', () => {
  let facade: HueLightHttpAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HueLightHttpAdapter],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    }).compile();

    facade = module.get<HueLightHttpAdapter>(HueLightHttpAdapter);
  });

  it('should be defined', () => {
    expect(facade).toBeDefined();
  });

  it('should set light on', async () => {
    const light: Light = {
      id: '0018a92e-ba65-4ea3-8abf-91043a1f4b1c',
      name: 'Light 1',
      state: {
        on: true,
        bri: 254,
        hue: 0,
        sat: 0,
        effect: 'none',
        ct: 0,
        alert: 'none',
        colormode: 'hs',
        reachable: true,
        xy: [],
      },
    };

    const response = (await facade.setStatus(light)) as number;
    expect(response).toBe(200);
  });
});
