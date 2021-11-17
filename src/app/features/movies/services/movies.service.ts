import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators'

@Injectable()
export class MoviesService {

  constructor(
    private readonly _http: HttpClient
  ) { }

  async load(option: 'trending'|'discover'|'genre'|'highlight', genreId:string|undefined = undefined) {
    let url!:string;
    // construction de l'url
    switch (true) {
      case option === 'trending':
        url = environment.movieApiUrl + `/trending/all/day?api_key=${environment.apiKey}`;
        break;
      case option === 'discover':
        url = environment.movieApiUrl + `/discover/movie?api_key=${environment.apiKey}`;
        break;
      case option === 'genre' && genreId !== undefined:
        url = environment.movieApiUrl + `/discover/movie?api_key=${environment.apiKey}&with_genres=${genreId}`;
        break;
      default:
        break;
    }
    if (!url) {
      // gestion d'erreur...
      throw new Error('load request error: need an option to make request.')
    }
    // request http
    const movies = await this._http
    .get<{results: any[]}>(url)
    .pipe(
      // data formating
      map(response => response.results),
      map((results:any[]) => {
        if (!results) {
          return [];
        }
        return results.map(i => {
          if (!i.poster_path || !i.backdrop_path) return i;
          i.backdrop_path = environment.movieImgUrl + `${i.backdrop_path}`;
          i.poster_path = environment.movieImgUrl + `${i.poster_path}`;
          return i;
        })
      })
    )
    .toPromise();
    return movies;
  }

  async getGenres() {
    const url = environment.movieApiUrl + `/genre/movie/list?api_key=${environment.apiKey}`;
    const {genres = []} = await this._http
    .get<{genres: {id: string, name: string}[]}>(url)
    .toPromise();
    // turn array as promise onject list
    const queryList = genres.map(async (genre: {id: string, name: string}) => {
      const result = await this.load('genre', genre.id);
      return {result, name: genre.name };
    });
    return Promise.all(queryList);
  }
}