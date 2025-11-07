import * as path from 'path';
import * as fs from 'fs';

export abstract class AbstractDeviceRepositoryLocal {
  static EMPTY_DEVICE_MAPPING_DTO_COLLECTION = {
    deviceMappings: <DeviceMappingDto[]>[],
  };
  static EMTPY_DEVICE_DTO_COLLECTION = { devices: <DeviceDto[]>[] };

  loadDeviceMappings(): DeviceMappingDtoCollection {
    try {
      const deviceCollection: DeviceCollectionDto = this.load();
      return {
        deviceMappings: deviceCollection.devices.map((d) => ({
          buttonId: d.commandId,
          lightId: d.deviceId,
          name: d.name,
        })),
      };
    } catch (e) {
      console.log(e);
    }
    return AbstractDeviceRepositoryLocal.EMPTY_DEVICE_MAPPING_DTO_COLLECTION;
  }

  private readFileCwd(file: string): string {
    try {
      return fs.readFileSync(path.join(process.cwd(), file), 'utf8');
    } catch (e) {
      console.log('Could not read file', e);
    }
    return '';
  }

  load(): DeviceCollectionDto {
    try {
      const fc: string = this.readFileCwd('.device_info/device-mappings.json');
      return { devices: JSON.parse(fc) as DeviceDto[] };
    } catch (e) {
      console.log(e);
    }
    return AbstractDeviceRepositoryLocal.EMTPY_DEVICE_DTO_COLLECTION;
  }
}

export type DeviceMappingDtoCollection = {
  deviceMappings: DeviceMappingDto[];
};

export type DeviceMappingDto = {
  buttonId: string;
  lightId: string;
  name: string;
};

export type DeviceDtoCollection = DeviceDto[];

export type DeviceDto = {
  commandId: string;
  deviceId: string;
  name: string;
};

export type DeviceCollectionDto = {
  devices: DeviceDto[];
};
