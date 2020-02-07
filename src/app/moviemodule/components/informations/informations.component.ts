import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Movie, Cast, Crew } from 'src/app/shared/services/movie/movie.service';
import { LibraryService } from 'src/app/shared/services/library/library.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit, OnDestroy {
  /**
   * @internal
   */
  public directors: Crew[];
  /**
   * @internal
   */
  public actors: Cast[];
  /**
   * @internal
   */
  public movieCredits$: Observable<Movie>;
  public isWatched$: Observable<boolean>;
  public isToWatch$: Observable<boolean>;

  private destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<InformationsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Movie,
    private library: LibraryService,
    private router: Router
    ) {}

  public ngOnInit() {
    this.isWatched$ = this.library.watchedListChange.pipe(map(ids => {
      return ids.includes(this.data.id);
    }));
    this.isToWatch$ = this.library.toWatchListChange.pipe(map(ids => {
      return ids.includes(this.data.id);
    }));
    this.actors = this.data.cast;
    this.directors = this.data.crew;

    this.router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      if (event) {
        this.dialogRef.close();
      }
    });
  }

  public ngOnDestroy() {
    this.destroy$.next();
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

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
