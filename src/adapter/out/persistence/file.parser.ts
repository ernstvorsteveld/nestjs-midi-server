import * as fs from 'fs/promises';
import * as path from 'path';

export class FileParser<S, T> {
  private t: T[] = [];
  private readonly data: (s: S) => T[];

  constructor(data: (s: S) => T[]) {
    this.data = data;
  }

  async loadFromFile(filePath: string): Promise<void> {
    try {
      const srcPath = path.join(process.cwd(), filePath);
      const fileContent = await fs.readFile(srcPath, 'utf-8');
      const s: S = JSON.parse(fileContent) as S;
      this.t = this.data(s);
    } catch (error) {
      console.error('Error loading file:', error);
      throw error;
    }
  }

  getData(): T[] {
    return this.t;
  }
}
