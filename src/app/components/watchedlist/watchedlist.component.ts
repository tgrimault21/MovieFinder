import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library/library.service';
import { Movies, MovieService } from 'src/app/services/movie/movie.service';
import { switchMap } from 'rxjs/operators';
import { Observable, forkJoin, EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-watchedlist',
  templateUrl: './watchedlist.component.html',
  styleUrls: ['./watchedlist.component.css']
})
export class WatchedlistComponent implements OnInit {
  public movieList$: Observable<Movies> = EMPTY;

  constructor(
    private library: LibraryService,
    private movie: MovieService
    ) {}

  public ngOnInit() {
    this.library.loadWatched();

    this.movieList$ = this.library.watchedListChange.pipe(switchMap(
      ids => this.getMoviesWatched(ids)
    ));
  }

  /**
   * List in movieList the details of every movie watched based on the list of ids in local storage
   * @param ids list of movie id
   */
  private getMoviesWatched(ids: number[]): Observable<Movies> {
    if (ids.length === 0) {
      return of([]);
    }

    return forkJoin(
      ids.map(idMoviesWatched => this.movie.fetch(idMoviesWatched))
    );
  }

}
