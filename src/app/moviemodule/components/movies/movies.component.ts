import { Component, OnInit } from '@angular/core';
import { Movies, MovieService, Movie } from 'src/app/shared/services/movie/movie.service';
import { Observable, EMPTY, merge, of, forkJoin, combineLatest } from 'rxjs';
import { map, switchMap, tap, partition } from 'rxjs/operators';
import { FilterService, Filters } from 'src/app/shared/services/filter/filter.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public dataMovie$: Observable<Movies> = EMPTY;
  public route$: Observable<{title: string, class: string, icon: string}>;

  private nbDisplay = 10;

  constructor(
    private movie: MovieService,
    private filterService: FilterService
  ) { }

  public ngOnInit() {
    this.route$ = this.filterService.route;

    const filterChange = this.filterService.filterChange;
    const [popular, search] = partition((filters: Filters) => (filters.text || '').length === 0)(filterChange);

    this.dataMovie$ = merge(
      popular.pipe(switchMap(() => this.getPopularMovies())),
      search.pipe(switchMap(res => this.movieResearch(res))),
    );
  }

  /**
   * Called when the form is submited
   * @param search the form
   */
  private movieResearch(searchEncoded: Filters): Observable<Movies> {
    // This will search through the database based on the 'name of the movie' input, and then we apply filters on the result
    const movieListSearch$ = this.movie.search(searchEncoded.text);
    return movieListSearch$.pipe(
      map(res => this.filterService.filterMovies(res, searchEncoded)),
      switchMap(res => this.extraction(res, this.nbDisplay))
    );
  }

  /**
   * Show the list of top popular movies by default
   */
  private getPopularMovies(): Observable<Movies> {
    return this.movie.listPopular()
      .pipe(
        map(res => {
          if (!res) {
            return [];
          }
          return this.filterService.takeIdOutOfMovies(res.results);
        }),
        switchMap(res => this.extraction(res, this.nbDisplay))
    );
  }

  /**
   * Only 10 movies will be displayed on the screen
   * @param movies list of movie ids
   * @param nbDisplay number of movies to display on screen
   */
  private extraction(movies: number[], nbDisplay: number): Observable<Movies> {
    return this.filterService.getMovieDetails(movies.splice(0, nbDisplay));
  }
}
