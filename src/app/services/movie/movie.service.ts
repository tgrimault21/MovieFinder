import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TheMovieDbService } from '../themoviedb/themoviedb.service';

export interface Movie {
  id: string;
  name: string;
}

export type Movies = Movie[];

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(
    private themoviedb: TheMovieDbService
  ) {}

  public listPopular(): Observable<Movies> {
  }

  public search(filters: {}): Observable<Movies> {
  }

  public fetch(id: string): Observable<Movie> {
  }
}
