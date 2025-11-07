import { FileParser } from './file.parser';
import { DeviceDto, HueDevicesResponse } from './device.model';
import { Device } from 'src/domain/model/device.model';

describe('FileParser', () => {
  let parser1: FileParser<HueDevicesResponse, DeviceDto, Device>;

  beforeEach(() => {
    parser1 = new FileParser<HueDevicesResponse, DeviceDto, Device>(
      data,
      mapper,
    );
  });

  it('should load hue data object', async () => {
    await parser1.loadFromFile('.device_info/device-info.json');
    expect(parser1.getData().length).toBe(23);
    expect(parser1.getData()[0].name).toBe('Hue dimmer switch 1');
  });
});

function data(t: HueDevicesResponse): DeviceDto[] {
  return t.data;
}

function mapper(t: DeviceDto): Device {
  return {
    commandId: 'onbkeend',
    deviceId: t.id,
    name: t.metadata.name,
  };
}
