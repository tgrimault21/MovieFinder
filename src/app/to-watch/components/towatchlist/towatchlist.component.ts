import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/shared/services/library/library.service';
import { Movies, MovieService } from 'src/app/shared/services/movie/movie.service';
import { switchMap } from 'rxjs/operators';
import { Observable, forkJoin, EMPTY, of } from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter/filter.service';

@Component({
  selector: 'app-towatchlist',
  templateUrl: './towatchlist.component.html',
  styleUrls: ['./towatchlist.component.css']
})
export class TowatchlistComponent implements OnInit {
  public movieList$: Observable<Movies> = EMPTY;

  constructor(
    private filterService: FilterService,
    private library: LibraryService
  ) { }

  public ngOnInit() {
    this.movieList$ = this.library.toWatchListChange.pipe(switchMap(
      ids => this.filterService.getMovieDetails(ids)
    ));

    this.library.loadToWatch();
  }

  public removeToWatch(id: number) {
    this.library.toggleToWatch(id);
  }
}
