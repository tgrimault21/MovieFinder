import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenreService, Genres } from 'src/app/services/genre/genre.service';
import { MovieService, Movie, Movies } from 'src/app/services/movie/movie.service';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { RouterModule, Routes } from '@angular/router';
import { FilterService } from 'src/app/services/filter/filter.service';

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
  public navLinks: Nav[] = [];
  public isFetched = false;

  constructor(
    private genre: GenreService,
    private filter: FilterService
  ) {}

  public ngOnInit() {
    /*if (this.moviesAfterGenreFilter.length === 0) {
    }*/

    this.genresList$ = this.genre.list();
    this.setRoutes();
  }

  /**
   * To use when we want to test data in html
   * @param data something to display
   */
  public console(message: string, data: any) {
    console.log(message, data);
  }

  private setRoutes() {
    const watched: Nav = {
      label: 'Watched Movies',
      path: '/watched'
    };

    const toWatch: Nav = {
      label: 'Movies to watch',
      path: '/to-watch'
    };

    this.navLinks.push(watched, toWatch);
  }

  public submitForm(search: NgForm) {
    const form = search.form.value;
    // clear release date filters field when they aren't valid input
    if (!form.filterYearAfter || form.filterYearAfter > '2019') {
      this.filterReleasedAfter = null;
    }
    if (!form.filterYearBefore || form.filterYearBefore > '2020' || form.filterYearBefore <= form.filterYearAfter) {
      this.filterReleasedBefore = null;
    }
    this.filter.sendForm({
      text: form.searchMovie,
      genre: form.filterGenres,
      releasedAfter: form.filterYearAfter,
      releasedBefore: form.filterYearBefore,
    });
  }
}
