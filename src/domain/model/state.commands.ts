/**
 * OnOffCommand tells the system to turn on or off a device.
 *
 * @remarks
 * This means it tells us to change the state of the device. If the device is on, turn it off.
 * If the device is off, turn it on.
 *
 * @property {string} id - The identifier of the button pressed.
 */
export type OnOffCommand = {
  buttonId: string;
};
