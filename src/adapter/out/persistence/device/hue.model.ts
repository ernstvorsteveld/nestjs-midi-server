export interface HueServiceDto {
  rid: string;
  rtype: string;
}

export interface HueProductDataDto {
  model_id: string;
  manufacturer_name: string;
  product_name: string;
  product_archetype: string;
  certified: boolean;
  software_version: string;
  hardware_platform_type?: string;
}

export interface HueMetadataDto {
  name: string;
  archetype: string;
}

export type HueIdentifyDto = unknown;

export interface HueUserTestDto {
  status: string;
  usertest: boolean;
}

export interface HueDeviceDto {
  id: string;
  id_v1?: string;
  product_data: HueProductDataDto;
  metadata: HueMetadataDto;
  identify?: HueIdentifyDto;
  usertest?: HueUserTestDto;
  services: HueServiceDto[];
  type: string;
}

export interface HueDevicesResponse {
  errors: any[];
  data: HueDeviceDto[];
}

export class HueDevice {
  constructor(public device: HueDeviceDto) {}

  get name(): string {
    return this.device.metadata.name;
  }

  get manufacturer(): string {
    return this.device.product_data.manufacturer_name;
  }

  get model(): string {
    return this.device.product_data.model_id;
  }

  get productName(): string {
    return this.device.product_data.product_name;
  }

  isLight(): boolean {
    return this.device.services.some((s) => s.rtype === 'light');
  }

  isSensor(): boolean {
    return this.device.services.some(
      (s) =>
        s.rtype === 'motion' ||
        s.rtype === 'temperature' ||
        s.rtype === 'light_level',
    );
  }

  isButton(): boolean {
    return this.device.services.some((s) => s.rtype === 'button');
  }

  isBridge(): boolean {
    return this.device.services.some((s) => s.rtype === 'bridge');
  }

  hasService(serviceType: string): boolean {
    return this.device.services.some((s) => s.rtype === serviceType);
  }

  getServices(serviceType?: string): HueServiceDto[] {
    if (serviceType) {
      return this.device.services.filter((s) => s.rtype === serviceType);
    }
    return this.device.services;
  }
}
