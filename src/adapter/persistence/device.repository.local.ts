import * as path from 'path';
import * as fs from 'fs';
import { Device, DeviceCollection } from 'src/domain/model/device.model';
import { DeviceRepository } from 'src/port/out/persistence/device.repository';

export class DeviceRepositoryLocal implements DeviceRepository {
  private devices: DeviceCollection;

  constructor() {
    this.load();
  }

  load(): void {
    try {
      const filePath = path.join(__dirname, 'devices.json');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      this.devices = new DeviceCollection(JSON.parse(fileContent) as Device[]);
    } catch (e) {
      console.log(e);
    }
  }

  getAll(): DeviceCollection {
    return this.devices;
  }
}
