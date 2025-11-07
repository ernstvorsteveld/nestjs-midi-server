import * as fs from 'fs/promises';
import * as path from 'path';

export class FileParser<S, T, R> {
  private r: R[] = [];
  private readonly data: (s: S) => T[];
  private readonly mapper: (t: T) => R;

  constructor(data: (s: S) => T[], mapper: (t: T) => R) {
    this.data = data;
    this.mapper = mapper;
  }

  async loadFromFile(filePath: string): Promise<void> {
    try {
      const srcPath = path.join(process.cwd(), filePath);
      const fileContent = await fs.readFile(srcPath, 'utf-8');
      const s: S = JSON.parse(fileContent) as S;
      this.r = this.data(s).map((t) => this.mapper(t));
    } catch (error) {
      console.error('Error loading file:', error);
      throw error;
    }
    console.log(`Loaded ${this.r.length} devices from ${filePath}`);
  }

  getData(): R[] {
    return this.r;
  }
}
