export type Light = {
  id: string;
  name: string;
  state: {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: string;
    xy: string[];
    ct: number;
    alert: string;
    colormode: string;
    reachable: boolean;
  };
};

export type LightStatusRequest = {
  on: {
    on: boolean;
  };
};

export enum LightState {
  ON,
  OFF,
}

/**
 * A generic identifier for a resource (e.g., a device)
 */
export type HueResourceIdentifier = {
  rid: string;
  rtype: string;
};

/**
 * Metadata for the light
 */
export type HueLightMetadata = {
  name: string;
  archetype: string;
  fixed_mired: number;
  function: string;
};

/**
 * On/off state of the light
 */
export type HueLightOn = {
  on: boolean;
};

/**
 * Dimming properties of the light
 */
export type HueLightDimming = {
  brightness: number;
  min_dim_level: number;
};

/**
 * Dynamic scene properties
 */
export type HueLightDynamics = {
  status: string;
  status_values: string[];
  speed: number;
  speed_valid: boolean;
};

/**
 * Alert effect properties
 */
export type HueLightAlert = {
  action_values: string[];
};

/**
 * Signaling properties
 */
export type HueLightSignaling = {
  signal_values: string[];
};

/**
 * V1 effects properties
 */
export type HueLightEffects = {
  status_values: string[];
  status: string;
  effect_values: string[];
};

/**
 * V2 effects properties
 */
export type HueLightEffectsV2 = {
  action: {
    effect_values: string[];
  };
  status: {
    effect: string;
    effect_values: string[];
  };
};

/**
 * Power-on behavior for the light's on-state
 */
export type HuePowerupOn = {
  mode?: string;
  on: {
    on: boolean;
  };
};

/**
 * Power-on behavior for the light's dimming state
 */
export type HuePowerupDimming = {
  mode: string;
  dimming: {
    brightness: number;
  };
};

/**
 * Power-on behavior configuration
 */
export type HueLightPowerup = {
  preset: string;
  configured: boolean;
  on: HuePowerupOn;
  dimming: HuePowerupDimming;
};

/**
 * Represents a single light resource from the Hue API
 */
export type HueLight = {
  id: string;
  id_v1: string;
  owner: HueResourceIdentifier;
  metadata: HueLightMetadata;
  product_data: HueProductData;
  identify: Record<string, never>; // Empty object
  service_id: number;
  on: HueLightOn;
  dimming: HueLightDimming;
  dimming_delta: Record<string, never>; // Empty object
  dynamics: HueLightDynamics;
  alert: HueLightAlert;
  signaling: HueLightSignaling;
  mode: string;
  effects: HueLightEffects;
  effects_v2: HueLightEffectsV2;
  powerup: HueLightPowerup;
  type: 'light';
};

/**
 * The top-level response from the Hue API
 */
export type HueApiResponse = {
  errors: unknown[]; // Use 'any[]' or a specific error type if known
  data: HueLight[];
};

/**
 * Defines the product-specific data for a Hue device.
 */
export type HueProductData = {
  model_id: string;
  manufacturer_name: string;
  product_name: string;
  product_archetype: string;
  certified: boolean;
  software_version: string;
  hardware_platform_type?: string; // Optional, not present on all devices
};

/**
 * Defines the user-configurable metadata for a Hue device.
 */
export type HueMetadata = {
  name: string;
  archetype: string;
};

/**
 * Represents a single service provided by a Hue device (e.g., button, light, motion).
 */
export type HueService = {
  rid: string;
  rtype: string;
};

/**
 * Represents the user test status, typically for sensors.
 */
export type HueUserTest = {
  status: string;
  usertest: boolean;
};

/**
 * Represents a single Hue device, which can be a light, sensor, switch, or bridge.
 */
export type HueDevice = {
  id: string;
  id_v1?: string; // Optional, not present on the bridge itself
  product_data: HueProductData;
  metadata: HueMetadata;
  services: HueService[];
  type: 'device';
  identify?: Record<string, never>; // Empty object, optional
  usertest?: HueUserTest; // Optional, only present on some sensors
};

/**
 * The top-level API response containing a list of Hue devices.
 */
export type HueDeviceApiResponse = {
  errors: unknown[]; // Use 'any[]' or a specific error type if known
  data: HueDevice[];
};
