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

export type HueResourceIdentifier = {
  rid: string;
  rtype: string;
};

export type HueLightMetadata = {
  name: string;
  archetype: string;
  fixed_mired?: number;
  function: string;
};

export type HueProductData = {
  function: string;
};

export type HueOnStatus = {
  on: boolean;
};

export type HueDimmingStatus = {
  brightness: number;
  min_dim_level?: number;
};

export type HueColorTemperature = {
  mirek: number | null;
  mirek_valid: boolean;
  mirek_schema: {
    mirek_minimum: number;
    mirek_maximum: number;
  };
};

export type HueColorXY = {
  x: number;
  y: number;
};

export type HueColorGamutPoint = {
  x: number;
  y: number;
};

export type HueColor = {
  xy: HueColorXY;
  gamut?: {
    red: HueColorGamutPoint;
    green: HueColorGamutPoint;
    blue: HueColorGamutPoint;
  };
  gamut_type: string;
};

export type HueDynamics = {
  status: string;
  status_values: string[];
  speed: number;
  speed_valid: boolean;
};

export type HueAlert = {
  action_values: string[];
};

export type HueSignaling = {
  signal_values?: string[];
};

export type HueEffects = {
  status: string;
  status_values: string[];
  effect_values: string[];
};

export type HueEffectsV2 = {
  action: {
    effect_values: string[];
  };
  status: {
    effect: string;
    effect_values: string[];
  };
};

export type HueTimedEffects = {
  status: string;
  status_values: string[];
  effect_values: string[];
};

export type HuePowerUp = {
  preset: string;
  configured: boolean;
  on: {
    mode: string;
    on: HueOnStatus;
  };
  dimming?: {
    mode: string;
    dimming: {
      brightness: number;
    };
  };
  color?: {
    mode: string;
    color_temperature?: {
      mirek: number;
    };
  };
};

/**
 * Main Hue Light Resource
 */
export type HueLight = {
  id: string;
  id_v1: string;
  owner: HueResourceIdentifier;
  metadata: HueLightMetadata;
  product_data: HueProductData;
  identify: Record<string, never>;
  service_id: number;
  on: HueOnStatus;
  dimming?: HueDimmingStatus;
  dimming_delta?: Record<string, never>;
  color_temperature?: HueColorTemperature;
  color_temperature_delta?: Record<string, never>;
  color?: HueColor;
  dynamics: HueDynamics;
  alert: HueAlert;
  signaling?: HueSignaling;
  mode: string;
  effects?: HueEffects;
  effects_v2?: HueEffectsV2;
  timed_effects?: HueTimedEffects;
  powerup?: HuePowerUp;
  type: 'light';
};

/**
 * Top Level Response Envelope
 */
export type HueApiResponse = {
  errors: any[];
  data: HueLight[];
};

/**
 * Payload for updating a light via PUT /clip/v2/resource/light/{id}
 */
export type HueLightUpdatePayload = {
  on?: {
    on: boolean;
  };
  dimming?: {
    brightness: number; // 0.0 to 100.0
  };
  color_temperature?: {
    mirek: number; // Typically 153 to 500
  };
  color?: {
    xy: {
      x: number;
      y: number;
    };
  };
  dynamics?: {
    duration?: number; // Transition time in milliseconds
    speed?: number; // 0.0 to 100.0
  };
  alert?: {
    action: 'breathe';
  };
};
