import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
  page?: number;
  total_resuts?: number;
  total_pages?: number;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class MockMovieService {
  constructor(
  ) {}

  /**
   * List the actual popular movies from themoviedb
   * @returns observable of movies not extracted from response
   */
  public listPopular(): Observable<Response<Movie>> {
    return of(undefined);
  }

  /**
   * List the movies filtered by name from themoviedb
   * @param query the movie the user is looking for
   * @returns observable of movies not extracted from response
   */
  public search(query: string): Observable<Response<Movie>> {
    return of(undefined);
  }

  /**
   * Get the details of a movie from themoviedb
   * @param id the id of the movie you want details on
   * @returns observable of movie details
   */
  public fetch(id: number): Observable<Movie> {
    return of(undefined);
  }

  /**
   * Get the credits of a movie from themoviedb
   * @param id the id of the movie you want credits of
   * @returns observable of movie credits
   */
  public fetchCredits(id: number): Observable<Movie> {
    return of(undefined);
  }
}
