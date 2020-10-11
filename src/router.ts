import Destinations from './destinations';


export default class Router {

  private readonly destinations: any;

  constructor() {
    const dests = new Destinations();
    this.destinations = dests.readFile();
  }

  get hasDestinations(): boolean {
    return Boolean(this.destinations);
  }

  findDestination = (ext: string): string | any => {
    return this.destinations[ext];
  };

  send = (url: string): void => {
    const opener = require('opener');
    opener(url);
  };
}