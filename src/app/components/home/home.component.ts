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
  filter2: any = "2000";
  filter3: any = "2020";
  storageWatched: any[] = [];
  storageToWatch: any[] = [];

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

  console(data) {
    return console.log(data);
  }

  addWatched(id) {
    this.setStorageWatched();
    if(!this.storageWatched.includes(id)){
      this.storageWatched.push(id);
    } else {
      let index = this.storageWatched.indexOf(id);
      this.storageWatched.splice(index,1);
    }
    localStorage.setItem("watched", JSON.stringify(this.storageWatched));
    console.log(JSON.parse(localStorage.getItem("watched")))
  }

  addToWatch(id) {
    this.setStorageToWatch();
    if(!this.storageToWatch.includes(id)){
      this.storageToWatch.push(id);
    } else {
      let index = this.storageToWatch.indexOf(id);
      this.storageToWatch.splice(index,1);
    }
    localStorage.setItem("toWatch", JSON.stringify(this.storageToWatch));
    console.log(JSON.parse(localStorage.getItem("toWatch")))
  }

  isWatched(id) {
    if(JSON.parse(localStorage.getItem("watched")) && JSON.parse(localStorage.getItem("watched")).includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  isToWatch(id) {
    if(JSON.parse(localStorage.getItem("toWatch")) && JSON.parse(localStorage.getItem("toWatch")).includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  setStorageWatched() {
    if(JSON.parse(localStorage.getItem("watched"))) this.storageWatched = JSON.parse(localStorage.getItem("watched"));
  }

  setStorageToWatch() {
    if(JSON.parse(localStorage.getItem("toWatch"))) this.storageToWatch = JSON.parse(localStorage.getItem("toWatch"));
  }

  getYear(releaseDate) {
    releaseDate = releaseDate.split("-");
    var year = releaseDate[0];
    return year;
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

  filterMoviesByReleaseDateAfter(filterYear, res) {
    this.moviesAfterGenreFilter = res.filter(movie => this.getYear(movie.release_date) >= filterYear.toString())
  }

  filterMoviesByReleaseDateBefore(filterYear, res) {
    this.moviesAfterGenreFilter = res.filter(movie => this.getYear(movie.release_date) < filterYear.toString())
  }

  movieResearch(search: NgForm) {
    console.log(search);
    if(!search.form.value.filterYearAfter || search.form.value.filterYearAfter>"2019") this.filter2 = null;
    if(!search.form.value.filterYearBefore || search.form.value.filterYearBefore>"2020" || search.form.value.filterYearBefore<=search.form.value.filterYearAfter) this.filter3 = null;
    if(search.form.value.searchMovie){
      this.http.get("https://api.themoviedb.org/3/search/movie?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US&include_adult=false&query=" + search.form.value.searchMovie).subscribe(res => {
        if(search.form.value.filterGenres) {
          this.filterMoviesByGenre(search.form.value.filterGenres, res);
        } else {
          this.moviesAfterGenreFilter = (res as any).results;
        }
        if(search.form.value.filterYearAfter) {
          this.filterMoviesByReleaseDateAfter(search.form.value.filterYearAfter, this.moviesAfterGenreFilter);
        }
        if(search.form.value.filterYearBefore) {
          this.filterMoviesByReleaseDateBefore(search.form.value.filterYearBefore, this.moviesAfterGenreFilter);
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
