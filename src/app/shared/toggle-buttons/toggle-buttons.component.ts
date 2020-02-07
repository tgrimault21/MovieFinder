import { Component, OnInit, Input } from '@angular/core';
import { LibraryService } from '../services/library/library.service';
import { Observable } from 'rxjs';
import { Movie } from '../services/movie/movie.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-toggle-buttons',
  templateUrl: './toggle-buttons.component.html',
  styleUrls: ['./toggle-buttons.component.css']
})
export class ToggleButtonsComponent implements OnInit {
  @Input()
  public movie: Movie;
  public isWatched$: Observable<boolean>;
  public isToWatch$: Observable<boolean>;

  constructor(
    private library: LibraryService
  ) { }

  ngOnInit() {
    this.isWatched$ = this.library.watchedListChange.pipe(map(ids => {
      return ids.includes(this.movie.id);
    }));
    this.isToWatch$ = this.library.toWatchListChange.pipe(map(ids => {
      return ids.includes(this.movie.id);
    }));
  }

  /**
   * Add or remove a movie to/from watched list
   * @param id id of the movie to add or remove from watched list
   */
  public addWatched(id: number) {
    this.library.toggleWatched(id);
  }

  /**
   * Add or remove a movie to/from toWatch list
   * @param id id of the movie to add or remove from toWatch list
   */
  public addToWatch(id: number) {
    this.library.toggleToWatch(id);
  }

}
