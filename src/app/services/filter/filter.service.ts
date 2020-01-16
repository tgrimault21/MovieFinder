import { Injectable } from '@angular/core';
import { Movie, Movies, Response, MovieService } from '../movie/movie.service';
import { Observable, forkJoin, of, Subject, BehaviorSubject } from 'rxjs';
import { Genre, Genres } from '../genre/genre.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

export interface Filters {
  text?: string;
  genre?: number[];
  releasedAfter?: number;
  releasedBefore?: number;
}

export interface FiltersEncoded {
  text: string;
  genre: string;
  releasedAfter: number;
  releasedBefore: number;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  private moviesAfterGenreFilter: Movies = [];

  public sendNewForm = new BehaviorSubject<Filters>({});
  public route: ActivatedRoute;

  constructor(
    private movie: MovieService,
    private router: Router
  ) {}

  /**
   * Apply genre and date filters
   * @param res movies searched with name query
   * @param form form submited
   * @returns array of ids of movies filtered
   */
  public filterMovies(res: Response<Movie>, form: Filters): number[] {
    if (form.genre && form.genre.length !== 0) {
      this.filterMoviesByGenre(form.genre, res);
    } else {
      this.moviesAfterGenreFilter = res.results;
    }

    if (form.releasedAfter) {
      this.filterMoviesByReleaseDateAfter(form.releasedAfter, this.moviesAfterGenreFilter);
    }

    if (form.releasedBefore) {
      this.filterMoviesByReleaseDateBefore(form.releasedBefore, this.moviesAfterGenreFilter);
    }

    return this.takeIdOutOfMovies(this.moviesAfterGenreFilter);
  }

  /**
   * Only 10 movies will be displayed on the screen
   * @param movies list of movie ids
   * @param nbDisplay number of movies to display on screen
   */
  public extraction(movies: number[], nbDisplay: number): Observable<Movies> {
    return this.getMovieDetails(movies.splice(0, nbDisplay));
  }

  /**
   * Put details of every movie shown on the screen in an array
   * @param movies list of 10 ids
   */
  private getMovieDetails(movies: number[]): Observable<Movies> {
    if (movies.length === 0) {
      return of([]);
    }

    return forkJoin(
      movies.map( movieId => this.movie.fetch(movieId))
    );
  }

 /**
  * Comparing the year of the release date of the film with the year in filter input
  * @param filterYear input in the form
  * @param res movies filtered by name and genre
  */
 private filterMoviesByReleaseDateAfter(filterYear: number, res: Movies) {
   this.moviesAfterGenreFilter = res.filter(movie => this.getYear(movie.release_date) >= filterYear);
 }

 /**
  * Comparing the year of the release date of the film with the year in filter input
  * @param filterYear input in the form
  * @param res movies filtered by name and genre
  */
 private filterMoviesByReleaseDateBefore(filterYear: number, res: Movies) {
   this.moviesAfterGenreFilter = res.filter(movie => this.getYear(movie.release_date) < filterYear);
 }

 /**
  * Take ids out of movies sent
  * @param movies movies you want to take ids from
  * @returns array of movie ids
  */
 public takeIdOutOfMovies(movies: Movies): number[] {
   return movies.map(res => res.id);
 }

  /**
   * Split year from complete date
   * @param releaseDate the release date of a movie
   * @returns only the year part of the date
   */
  private getYear(releaseDate: string): number {
    return parseInt(releaseDate.split('-')[0], 10);
  }

  /**
   * Test if one of the genre selected in the filter is associated to each movie
   * @param filterGenres genres checked in the form
   * @param res response from the API
   */
  private filterMoviesByGenre(filterGenres: number[], res: Response<Movie>) {
    // Only keep movies where at least one of the genres associated with is selected in the filter
    this.moviesAfterGenreFilter = res.results.filter(movie => {
      return movie.genre_ids.some(id => filterGenres.includes(id));
    });
  }

  public sendForm(search: Filters) {
    const genresEncoded = btoa(search.genre.toString());
    // tslint:disable-next-line: max-line-length
    this.router.navigate(['/list'], {queryParams: {movie: search.text, genres: genresEncoded, releasedafter: search.releasedAfter, releasedbefore: search.releasedBefore}});
  }

  public filters$(route: ActivatedRoute): Observable<FiltersEncoded> {
    return route.queryParams.pipe(map(params => {
      return {
        text: params.movie,
        genre: params.genres,
        releasedAfter: +params.releasedafter,
        releasedBefore: +params.releasedbefore
      };
    }));
  }
}
