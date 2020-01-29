import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Genre {
  id: number;
  name: string;
}

export type Genres = Genre[];

@Injectable({
  providedIn: 'root'
})
export class MockGenreService {
  constructor() {}

  /**
   * List all genres from themoviedb
   * @returns array of Genres
   */
  public list(): Observable<Genres> {
    return of([]);
  }
}
