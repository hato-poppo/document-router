import { readFileSync, existsSync } from 'fs';
import path = require('path');


export default class Destinations {

  private readonly dirPath = '../';
  private readonly fileName = 'destinations.json';

  get filePath(): string {
    return path.join(__dirname, this.dirPath, this.fileName);
  }

  get isExists(): boolean {
    return existsSync(this.filePath);
  }

  readFile = (): any | undefined => {
    if (!this.isExists) { 
      console.error(`【ERROR】設定ファイルが見つかりませんでした。設定ファイルを指定の場所に格納して下さい。 => ${this.filePath}`);
      return undefined;
    }

    try {
      const settings = readFileSync(this.filePath, 'utf8');
      return JSON.parse(settings);
    } catch (err) {
      console.error(err.toString());
      return undefined;
    }
  };
}