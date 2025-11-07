export interface ServiceDto {
  rid: string;
  rtype: string;
}

export interface ProductDataDto {
  model_id: string;
  manufacturer_name: string;
  product_name: string;
  product_archetype: string;
  certified: boolean;
  software_version: string;
  hardware_platform_type?: string;
}

export interface MetadataDto {
  name: string;
  archetype: string;
}

export type IdentifyDto = unknown;

export interface UserTestDto {
  status: string;
  usertest: boolean;
}

export interface DeviceDto {
  id: string;
  id_v1?: string;
  product_data: ProductDataDto;
  metadata: MetadataDto;
  identify?: IdentifyDto;
  usertest?: UserTestDto;
  services: ServiceDto[];
  type: string;
}

export interface HueDevicesResponse {
  errors: any[];
  data: DeviceDto[];
}

export class HueDevice {
  constructor(public device: DeviceDto) {}

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

  getServices(serviceType?: string): ServiceDto[] {
    if (serviceType) {
      return this.device.services.filter((s) => s.rtype === serviceType);
    }
    return this.device.services;
  }
}
