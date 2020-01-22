import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenreService, Genres, Genre } from 'src/app/shared/services/genre/genre.service';
import { Movie } from 'src/app/shared/services/movie/movie.service';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FilterService } from 'src/app/shared/services/filter/filter.service';

export interface Nav {
  label: string;
  path: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public genresList$: Observable<Genres>;
  public movieDetails$: Observable<Movie>;
  public filterReleasedAfter = '1900';
  public filterReleasedBefore = '2020';
  public genres = [{id: 28, name: 'Action'}];
  public filters$: Observable<{name: string, genres: Genres}>;
  public isFetched = false;

  constructor(
    private genre: GenreService,
    private filterService: FilterService
  ) {}

  public ngOnInit() {
    this.genresList$ = this.genre.list();
    this.filters$ = this.filterService.filterChange.pipe(
      switchMap(filters => {
        return this.genresList$
          .pipe(
            map(genres => {
            return {
              name: filters.text,
              genres: genres.filter(genreTemp => filters.genre.includes(genreTemp.id)),
            };
          }));
      })
    );
  }

  /**
   * To use when we want to test data in html
   * @param data something to display
   */
  public console(message: string, data: any) {
    console.log(message, data);
  }

  /**
   * Submit form
   * @param search the whole form
   */
  public submitForm(search: NgForm) {
    const form = search.form.value;
    let filterGenres = [];
    // clear release date filters field when they aren't valid input
    if (!form.filterYearAfter || form.filterYearAfter > '2019') {
      this.filterReleasedAfter = null;
    }
    if (!form.filterYearBefore || form.filterYearBefore > '2020' || form.filterYearBefore <= form.filterYearAfter) {
      this.filterReleasedBefore = null;
    }
    if (form.filterGenres) {
      filterGenres = form.filterGenres.map((res: Genre) => res.id);
    }
    this.filterService.sendForm({
      text: form.searchMovie,
      genre: filterGenres,
      releasedAfter: form.filterYearAfter,
      releasedBefore: form.filterYearBefore,
    });
  }
}
