import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, MovieService, Cast, Crew } from 'src/app/shared/services/movie/movie.service';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {
  /**
   * @internal
   */
  public director$: Observable<Crew[]>;
  /**
   * @internal
   */
  public actors$: Observable<Cast[]>;
  /**
   * @internal
   */
  public movieCredits$: Observable<Movie>;

  constructor(
    public dialogRef: MatDialogRef<InformationsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private movie: MovieService
    ) {}

  public ngOnInit() {
    this.getCredits();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Get the director and the top 5 actors of the movie we want more details on
   */
   private getCredits() {
    if (!this.data.id) {
      return;
    }

    this.movieCredits$ = this.movie.fetchCredits(this.data.id);

    this.actors$ = this.movieCredits$.pipe(map(res => {
      return res.cast.slice(0, 5);
    }));

    this.director$ = this.movieCredits$.pipe(map(res => {
      return res.crew.filter(staff => staff.department === 'Directing');
    }));
  }
}
