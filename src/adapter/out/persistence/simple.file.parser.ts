import * as fs from 'fs/promises';
import { HueDevice, HueDevicesResponse } from './device/hue.model';

export class SimpleFileParser {
  private devices: HueDevice[] = [];

  async loadFromFile(filePath: string): Promise<void> {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const response: HueDevicesResponse = JSON.parse(
        fileContent,
      ) as HueDevicesResponse;

      this.devices = response.data.map((device) => new HueDevice(device));

      console.log(`Loaded ${this.devices.length} devices from ${filePath}`);
    } catch (error) {
      console.error('Error loading file:', error);
      throw error;
    }
  }
  getAllDevices(): HueDevice[] {
    return this.devices;
  }

  getLights(): HueDevice[] {
    return this.devices.filter((d) => d.isLight());
  }

  getSensors(): HueDevice[] {
    return this.devices.filter((d) => d.isSensor());
  }

  getButtons(): HueDevice[] {
    return this.devices.filter((d) => d.isButton());
  }

  getBridge(): HueDevice | undefined {
    return this.devices.find((d) => d.isBridge());
  }

  getDeviceByName(name: string): HueDevice | undefined {
    return this.devices.find((d) => d.name === name);
  }

  getDeviceById(id: string): HueDevice | undefined {
    return this.devices.find((d) => d.device.id === id);
  }

  printSummary(): void {
    console.log('\n=== Hue Devices Summary ===');
    console.log(`Total devices: ${this.devices.length}`);
    console.log(`Lights: ${this.getLights().length}`);
    console.log(`Sensors: ${this.getSensors().length}`);
    console.log(`Buttons: ${this.getButtons().length}`);
    console.log(`Bridge: ${this.getBridge() ? 'Yes' : 'No'}`);

    console.log('\n=== All Devices ===');
    this.devices.forEach((device) => {
      const type = device.isLight()
        ? '💡'
        : device.isSensor()
          ? '📡'
          : device.isButton()
            ? '🔘'
            : device.isBridge()
              ? '🌉'
              : '❓';
      console.log(`${type} ${device.name} (${device.productName})`);
    });
  }
}
