import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TheMovieDbService } from '../themoviedb/themoviedb.service';

export interface Genre {
  id: number;
  name: string;
}

export type Genres = Genre[];

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(
    private themoviedb: TheMovieDbService
  ) {}

  public list(): Observable<Genres> {
    return this.themoviedb.get<{ genres: Genres }>('/genre/movie/list')
      .pipe(map(res => {
        return res.genres.map(genre => {
          return {
            id: genre.id,
            name: genre.name,
          };
        });
      }));
  }
}
