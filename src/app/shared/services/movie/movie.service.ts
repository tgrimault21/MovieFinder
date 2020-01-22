import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { TheMovieDbService } from '../themoviedb/themoviedb.service';

export interface Movie {
    title?: string;
    genre_ids?: number[];
    runtime?: number;
    release_date?: string;
    id: number;
    poster_path?: string;
    overview?: string;
    cast?: Cast[];
    crew?: Crew[];
}

export interface Cast {
  name: string;
}

export interface Crew {
  department: string;
}

export type Movies = Movie[];

export interface Response<T> {
  page: number;
  total_resuts: number;
  total_pages: number;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private themoviedb: TheMovieDbService
  ) {}

  /**
   * List the actual popular movies from themoviedb
   * @returns observable of movies not extracted from response
   */
  public listPopular(): Observable<Response<Movie>> {
    return this.themoviedb.get<Response<Movie>>('/movie/popular');
  }

  /**
   * List the movies filtered by name from themoviedb
   * @param query the movie the user is looking for
   * @returns observable of movies not extracted from response
   */
  public search(query: string): Observable<Response<Movie>> {
    return this.themoviedb.get<Response<Movie>>('/search/movie', '&include_adult=false', '&query=' + query);
  }

  /**
   * Get the details of a movie from themoviedb
   * @param id the id of the movie you want details on
   * @returns observable of movie details
   */
  public fetch(id: number): Observable<Movie> {
    return this.themoviedb.get<Movie>('/movie/' + id)
      .pipe(map(res => {
        return {
          title: res.title,
          runtime: res.runtime,
          release_date: res.release_date,
          id: res.id,
          poster_path: res.poster_path,
          overview: res.overview
        };
      }));
  }

  /**
   * Get the credits of a movie from themoviedb
   * @param id the id of the movie you want credits of
   * @returns observable of movie credits
   */
  public fetchCredits(id: number): Observable<Movie> {
    return this.themoviedb.get<Movie>('/movie/' + id + '/credits')
    .pipe(map(res => {
      return {
        cast: res.cast,
        crew: res.crew,
        id: res.id
      };
    }));
  }
}
