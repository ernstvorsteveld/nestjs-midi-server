import { FileParser } from '../file.parser';
import { DeviceDto, DeviceDtoCollection } from './device.model';
import { HueDevicesResponse, HueDeviceDto } from './hue.model';

export abstract class AbstractDeviceRepositoryLocal {
  static EMTPY_DEVICES_DTO_COLLECTION = { devices: [] };

  private parser: FileParser<HueDevicesResponse, DeviceDto>;

  async loadDeviceMappings(): Promise<DeviceDtoCollection> {
    this.parser = new FileParser<HueDevicesResponse, DeviceDto>(data);
    try {
      await this.parser.loadFromFile('.device_info/device-info.json');
      return { devices: this.parser.getData() };
    } catch (e) {
      console.log(e);
    }
    return AbstractDeviceRepositoryLocal.EMTPY_DEVICES_DTO_COLLECTION;
  }
}

function data(t: HueDevicesResponse): DeviceDto[] {
  return t.data.map((d) => {
    return {
      deviceId: getDeviceId(d),
      name: d.metadata.name,
    };
  });
}

function getDeviceId(d: HueDeviceDto): string {
  if (d === undefined) {
    return 'getDeviceId - unknown';
  }
  // const serviceDto = d.services.find((s) => s.rtype === 'light');
  // if (serviceDto === undefined) {
  //   return 'getDeviceId - unknown - 2';
  // }
  return d.id;
}
