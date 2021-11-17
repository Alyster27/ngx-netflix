import { Injectable } from '@angular/core';

@Injectable()
export class TrailerService {

  public isApiLoaded: boolean = false;
  public movieTrailer!: any;
  
  constructor() { }

  async findId(name: string): Promise<string> {
    // check to load api before
    if (!this.isApiLoaded) {
      await this._loadApi();
    }
    // use api library
    const trailerUrl = await this.movieTrailer(name);
    // return data id of trailer
    const trailerID = trailerUrl.split('=').reverse()[0];
    return trailerID;
  }

  private async _loadApi() {
    const lib = await import('movie-trailer' as any)
    .then((moduleLib: any) => {
      const movieTrailer = moduleLib.default;
      return movieTrailer;
    });
    this.movieTrailer = lib;
    this.isApiLoaded = true;
  }
}
