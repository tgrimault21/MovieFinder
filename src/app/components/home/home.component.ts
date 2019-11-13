import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InformationsComponent } from '../informations/informations.component';
import {NgForm} from '@angular/forms';

export interface Genres {
  genresAPI: any[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  popularMovies: any;
  dataMovie: any[] = [];
  nbDisplay: number = 10;
  extract: any;
  genresList: string[] = [];
  genresInterface: Genres;
  genreIDs: any[] = [];
  moviesAfterGenreFilter: any = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
    if(this.dataMovie.length == 0) {
      this.getPopularMovies(null);
    }
    this.getGenres();
  }

  getGenres() {
    this.http.get<Genres>("https://api.themoviedb.org/3/genre/movie/list?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US").subscribe(res => {
      this.genresInterface = {
        genresAPI: (res as any).genres
      }
      this.genresInterface.genresAPI.map(genre => {
        this.genresList.push(genre);
      })
    });
  }

  genreFilter(values) {
    console.log({message: "data movies", data: this.dataMovie})
  }

  console(data) {
    return console.log(data);
  }

  filterMoviesByGenre(filterGenres, res) {
    var i = 0;
    this.dataMovie = [];
    this.genreIDs = [];
    filterGenres.map(genre => {
      this.genreIDs.push(genre.id);
    });
    this.moviesAfterGenreFilter = (res as any).results.filter(movie => {
      movie.genre_ids.map(id => {
        i += this.genreIDs.indexOf(id);
      })
      if(i > 0) {
        return true;
      } else {
        return false;
      }
    })
  }

  movieResearch(search: NgForm) {
    console.log(search);
    if(search.form.value.searchMovie){
      this.http.get("https://api.themoviedb.org/3/search/movie?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US&include_adult=false&query=" + search.form.value.searchMovie).subscribe(res => {
        if(search.form.value.filterGenres) {
          this.filterMoviesByGenre(search.form.value.filterGenres, res);
        } else {
          this.moviesAfterGenreFilter = res;
        }
        this.extraction(this.moviesAfterGenreFilter, this.nbDisplay);
      });
    }
  }

  getPopularMovies(search: NgForm) {
    this.http.get("https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8").subscribe(res => {
      console.log({message: "popularMovies", data: res})
      this.extraction(res, this.nbDisplay);
    });
  }

  extraction(movies, nbDisplay) {
    if(movies.results) {
      this.extract = movies.results.slice(0,nbDisplay);
      movies = movies.results;
    } else {
      this.extract = movies.slice(0,nbDisplay);
    }
    this.getMovieDetails(movies);
  }

  getMovieDetails(movies) {
    let me = this;
    movies.forEach(function(movie) {
      me.http.get("https://api.themoviedb.org/3/movie/" + movie.id + "?language=en-US&api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8").subscribe(res => {
        me.dataMovie.push(res);
      });
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InformationsComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
