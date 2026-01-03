// Define a type for our decoded MIDI message for clarity
export interface MidiMessage {
  command: string;
  channel: number;
  note: number;
  velocity: number;
  controller?: number; // For CC messages
  value?: number; // For CC messages
  raw: number[];
}
