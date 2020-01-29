import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenreService, Genres, Genre } from 'src/app/shared/services/genre/genre.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterService, Filters } from 'src/app/shared/services/filter/filter.service';

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
  public filterReleasedAfter = '1900';
  public filterReleasedBefore = '2020';
  public filters$: Observable<{name: string}>;
  public isFetched = false;
  public genres: Genres;

  constructor(
    private genre: GenreService,
    private filterService: FilterService
  ) {}

  public ngOnInit() {
    this.genresList$ = this.genre.list();
    this.filters$ = this.filterService.filterChange.pipe(
      map(filters => {
        return {
          name: filters.text
        };
      })
    );
  }

  /**
   * Submit form
   * @param search the whole form
   */
  public submitForm(filters: {name: string}) {
    let filterGenres = [];
    // clear release date filters field when they aren't valid input
    if (!this.filterReleasedAfter || this.filterReleasedAfter > '2019') {
      this.filterReleasedAfter = null;
    }
    if (!this.filterReleasedBefore || this.filterReleasedBefore > '2020' || this.filterReleasedBefore <= this.filterReleasedAfter) {
      this.filterReleasedBefore = null;
    }
    if (this.genres) {
      filterGenres = this.genres.map((res: Genre) => res.id);
    }
    this.filterService.sendForm({
      text: filters.name,
      genre: filterGenres,
      releasedAfter: +this.filterReleasedAfter,
      releasedBefore: +this.filterReleasedBefore,
    });
  }
}
