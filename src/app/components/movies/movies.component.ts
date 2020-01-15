import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Movies, MovieService } from 'src/app/services/movie/movie.service';
import { Observable, EMPTY, merge } from 'rxjs';
import { map, switchMap, partition, filter } from 'rxjs/operators';
import { FilterService, Filters } from 'src/app/services/filter/filter.service';
import { Genre } from 'src/app/services/genre/genre.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public dataMovie$: Observable<Movies> = EMPTY;

  private nbDisplay = 10;

  constructor(
    private router: Router,
    private movie: MovieService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    const split$ = [
      this.filterService.sendNewForm.pipe(filter(filters => (filters.text || '').length === 0)),
      this.filterService.sendNewForm.pipe(filter(filters => (filters.text || '').length > 0)),
    ];

    this.dataMovie$ = merge(
      split$[0].pipe(switchMap(() => this.getPopularMovies())),
      split$[1].pipe(switchMap(res => this.movieResearch(res))),
    );
  }

  /**
   * Called when the form is submited
   * @param search the form
   */
  public movieResearch(search: Filters): Observable<Movies> {
    if (!search.text) {
      return EMPTY;
    }

    // This will search through the database based on the 'name of the movie' input, and then we apply filters on the result
    const movieListSearch$ = this.movie.search(search.text);
    return movieListSearch$.pipe(map(res => {
        return this.filterService.filterMovies(res, search);
      }),
      switchMap(res => this.filterService.extraction(res, this.nbDisplay))
    );
  }

  /**
   * Show the list of top popular movies by default
   */
  public getPopularMovies(): Observable<Movies> {
    return this.movie.listPopular()
      .pipe(
        map(res => {
          return this.filterService.takeIdOutOfMovies(res.results);
        }),
        switchMap(res => this.filterService.extraction(res, this.nbDisplay))
    );
  }
}
