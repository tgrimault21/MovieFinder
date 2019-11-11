import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InformationsComponent } from '../informations/informations.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  movies: any;
  dataMovie: any[] = [];
  nbDisplay: number = 10;
  extract: any;

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getMovies();
  }

  console(data) {
    return console.log(data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InformationsComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getMovies() {
    this.http.get("https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8").subscribe(res => {
      this.movies = res;
      console.log({message: "movies", data: this.movies})
      this.extraction(this.movies, this.nbDisplay);
    });
  }

  extraction(movies, nbDisplay) {
    this.extract = movies.results.slice(0,nbDisplay);
    this.getMovieDetails(movies);
  }

  getMovieDetails(movies) {
    let me = this;
    movies.results.forEach(function(movie) {
      me.http.get("https://api.themoviedb.org/3/movie/" + movie.id + "?language=en-US&api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8").subscribe(res => {
        me.dataMovie.push(res);
      });
    })
  }

}
