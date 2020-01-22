import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/shared/services/library/library.service';
import { Movies, MovieService } from 'src/app/shared/services/movie/movie.service';
import { switchMap } from 'rxjs/operators';
import { Observable, forkJoin, EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-towatchlist',
  templateUrl: './towatchlist.component.html',
  styleUrls: ['./towatchlist.component.css']
})
export class TowatchlistComponent implements OnInit {
  public movieList$: Observable<Movies> = EMPTY;

  constructor(
    private movie: MovieService,
    private library: LibraryService
  ) { }

  public ngOnInit() {
    this.movieList$ = this.library.toWatchListChange.pipe(switchMap(
      ids => this.getMoviesToWatch(ids)
    ));

    this.library.loadToWatch();
  }

  /**
   * List in movieList the details of every movie to watch based on the list of ids in local storage
   * @param ids list of movie ids
   */
  private getMoviesToWatch(ids: number[]): Observable<Movies> {
    if (ids.length === 0) {
      return of([]);
    }

    return forkJoin(
      ids.map(idMovieToWatch => this.movie.fetch(idMovieToWatch))
    );
  }
}
