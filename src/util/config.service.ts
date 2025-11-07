export const ConfigurationService = Symbol('ConfigurationService');
export interface ConfigurationService {
  hueHost(): string;
  hueAuthnkey(): string;
}
