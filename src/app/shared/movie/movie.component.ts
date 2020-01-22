import { Component, Input, OnChanges } from '@angular/core';
import { LibraryService } from 'src/app/shared/services/library/library.service';
import { Movie } from 'src/app/shared/services/movie/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { InformationsComponent } from '../../moviemodule/components/informations/informations.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnChanges {
  @Input()
  public movie: Movie;
  public isWatched: boolean;
  public isToWatch: boolean;

  constructor(
    private dialog: MatDialog,
    private library: LibraryService
  ) { }

  public ngOnChanges() {
    this.isWatched = this.library.isWatched(this.movie.id);
    this.isToWatch = this.library.isToWatch(this.movie.id);
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

  /**
   * Launch InformationsComponent on a modal when we click on 'More details' button
   * @param result movie data
   */
  public openDialog(result: Movie): void {
    this.dialog.open(InformationsComponent, {
      width: '450px',
      data: result
    });
  }

}
