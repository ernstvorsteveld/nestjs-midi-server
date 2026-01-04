import { HueDevicesResponse, HueDeviceDto } from './device/hue.model';
import { FileParser } from './file.parser';

describe('FileParser', () => {
  let parser: FileParser<HueDevicesResponse, HueDeviceDto>;

  beforeEach(() => {
    parser = new FileParser<HueDevicesResponse, HueDeviceDto>(data);
  });

  it('should load device data object', async () => {
    await parser.loadFromFile('.device_info/device-info.json');
    expect(parser.getData().length).toBe(18);
    expect(parser.getData()[0].metadata.name).toBe('Witte kleine lamp');
  });

  it('should load device data object in a sync manner', () => {
    parser
      .loadFromFile('.device_info/device-info.json')
      .then(() => {
        expect(parser.getData().length).toBe(18);
        expect(parser.getData()[0].metadata.name).toBe('Witte kleine lamp');
      })
      .catch((error) => console.error(error));
  });
});

function data(t: HueDevicesResponse): HueDeviceDto[] {
  return t.data;
}
