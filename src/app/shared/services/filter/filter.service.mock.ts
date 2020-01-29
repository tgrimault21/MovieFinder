import { Injectable } from '@angular/core';
import { Movie, Movies, Response } from '../movie/movie.service';
import { Observable, of } from 'rxjs';

export interface Filters {
  text?: string;
  genre?: number[];
  releasedAfter?: number;
  releasedBefore?: number;
}

@Injectable({
  providedIn: 'root',
})
export class MockFilterService {

  public filterChange: Observable<Filters>;

  constructor() {
    this.filterChange = of({
      text: '',
      genre: [],
      releasedAfter: 2000,
      releasedBefore: 2020
     });
  }

  /**
   * Apply genre and date filters
   * @param res movies searched with name query
   * @param form form submited
   * @returns array of ids of movies filtered
   */
  public filterMovies(res: Response<Movie>, form: Filters): number[] {
    return [];
  }

  /**
   * Take ids out of movies sent
   * @param movies movies you want to take ids from
   * @returns array of movie ids
   */
  public takeIdOutOfMovies(movies: Movies): number[] {
    return movies.map(res => res.id);
  }

 public sendForm(search: Filters) {

 }
}
