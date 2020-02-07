import { Component, Input, OnInit } from '@angular/core';
import { Movie, Crew, Cast } from 'src/app/shared/services/movie/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { InformationsComponent } from '../../moviemodule/components/informations/informations.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input()
  public movie: Movie;
  public directors: Crew[];
  public actors: Cast[];

  @Input()
  public first: boolean;

  constructor(
    private dialog: MatDialog
  ) { }

  public ngOnInit() {
    this.directors = this.movie.crew;
    this.actors = this.movie.cast;
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
