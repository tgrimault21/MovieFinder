import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, MovieService } from 'src/app/shared/services/movie/movie.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {
  /**
   * @internal
   */
  public director$: any;
  /**
   * @internal
   */
  public actors$: any;
  /**
   * @internal
   */
  public movieCredits$: Observable<Movie>;

  constructor(
    public dialogRef: MatDialogRef<InformationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private movie: MovieService
    ) {}

  public ngOnInit() {
    this.getCredits();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public console(data: any) {
    console.log(data);
  }

  /**
   * Get the director and the top 5 actors of the movie we want more details on
   */
   private getCredits() {
    if (!this.data) {
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
