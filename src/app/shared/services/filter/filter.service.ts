import { Injectable } from '@angular/core';
import { Movie, Movies, Response, MovieService } from '../movie/movie.service';
import { Observable, of, forkJoin, combineLatest } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { map, filter, tap, shareReplay, switchMap } from 'rxjs/operators';

export interface Filters {
  text?: string;
  genre?: number[];
  releasedAfter?: number;
  releasedBefore?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  private moviesAfterGenreFilter: Movies = [];

  public filterChange: Observable<Filters>;
  public route: Observable<{title: string, class: string, icon: string}>;

  constructor(
    private router: Router,
    private movie: MovieService,
    activatedRoute: ActivatedRoute
  ) {
    this.filterChange = activatedRoute.queryParams
      .pipe(
        map(params => {
          if (!params.movie) {
            return {
              text: '',
              genre: [],
              releasedAfter: 2000,
              releasedBefore: 2020
             };
          }
          return {
            text: params.movie,
            genre: this.decryptGenres(params.genres),
            releasedAfter: +params.releasedafter,
            releasedBefore: +params.releasedbefore
          };
        })
      );
    this.route = router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => {
          if (!event.url) {
            return;
          }
          if (event.url === '/list' || event.url.includes('/list?movie=&')) {
            return {
              title: 'TopMovie',
              class: 'primary',
              icon: 'play_arrow'
            };
          }
          if (event.url === '/watched') {
            return {
              title: 'MovieSeen',
              class: 'seen',
              icon: 'check'
            };
          }
          if (event.url === '/to-watch') {
            return {
              title: 'MovieToWatch',
              class: 'toWatch',
              icon: 'remove_red_eye'
            };
          }
          return {
            title: 'SearchResult',
            class: 'primary',
            icon: 'play_arrow'
          };
        }),
        shareReplay(1)
      );
  }

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
   * Take ids out of movies sent
   * @param movies movies you want to take ids from
   * @returns array of movie ids
   */
  public takeIdOutOfMovies(movies: Movies): number[] {
    return movies.map(res => res.id);
  }

  /**
   * Put details of every movie shown on the screen in an array
   * @param movies list of 10 ids
   */
  public getMovieDetails(movies: number[]): Observable<Movies> {
    if (movies.length === 0) {
      return of([]);
    }

    return forkJoin(
      movies.map( movieId => combineLatest(this.movie.fetch(movieId), this.getCredits(movieId)).pipe(switchMap(([details, credits]) => {
        return of({
          ...details,
          ...credits
        });
      })))
    );
  }

  /**
   * Get the director and the top 5 actors of the movie we want more details on
   */
  private getCredits(id: number): Observable<Movie> {
    if (!id) {
      return;
    }

    const movieCredits$ = this.movie.fetchCredits(id);

    return movieCredits$.pipe(map(res => {
      return {
        id: res.id,
        cast : res.cast.slice(0, 5),
        crew: res.crew.filter(staff => staff.department === 'Directing')
      };
    }));
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

 public sendForm(search: Filters) {
   let genresEncoded: string;
   if (search.genre) {
     genresEncoded = btoa(search.genre.toString());
   } else {
     genresEncoded = '';
   }
   // tslint:disable-next-line: max-line-length
   this.router.navigate(['/list'], {queryParams: {movie: search.text, genres: genresEncoded, releasedafter: search.releasedAfter, releasedbefore: search.releasedBefore}});
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

  /**
   * Decrypt base 64 to array of ids
   * @param genresEncoded base 64 genre ids array
   */
  private decryptGenres(genresEncoded: string): number[] {
    if (genresEncoded === '') {
      return [];
    }
    const stringIds = atob(genresEncoded).split(',');
    const numberIds = stringIds.map(id => +id);
    return numberIds;
  }
}
