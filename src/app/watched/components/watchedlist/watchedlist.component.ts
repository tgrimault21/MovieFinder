import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/shared/services/library/library.service';
import { Movies, MovieService } from 'src/app/shared/services/movie/movie.service';
import { switchMap } from 'rxjs/operators';
import { Observable, forkJoin, EMPTY, of } from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter/filter.service';

@Component({
  selector: 'app-watchedlist',
  templateUrl: './watchedlist.component.html',
  styleUrls: ['./watchedlist.component.css']
})
export class WatchedlistComponent implements OnInit {
  public movieList$: Observable<Movies> = EMPTY;

  constructor(
    private library: LibraryService,
    private filterService: FilterService
    ) {}

  public ngOnInit() {
    this.library.loadWatched();

    this.movieList$ = this.library.watchedListChange.pipe(switchMap(
      ids => this.filterService.getMovieDetails(ids)
    ));
  }

  public removeWatched(id: number) {
    this.library.toggleWatched(id);
  }
}
