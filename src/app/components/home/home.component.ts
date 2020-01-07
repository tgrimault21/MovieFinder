import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InformationsComponent } from '../informations/informations.component';
import { NgForm } from '@angular/forms';
import { GenreService, Genres } from 'src/app/services/genre/genre.service';
import { Observable } from 'rxjs';

export interface Genres {
  genresAPI: any[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public genresList$: Observable<Genres>;
  public dataMovie: any[] = [];
  public filterReleasedAfter = '2000';
  public filterReleasedBefore = '2020';

  private nbDisplay = 10;
  private extract: any;
  private genresInterface: Genres;
  private genreIDs: any[] = [];
  private moviesAfterGenreFilter: any = [];
  private storageWatched: number[] = [];
  private storageToWatch: number[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private genre: GenreService
  ) {}

  public ngOnInit() {
    if(this.dataMovie.length === 0) {
      this.getPopularMovies(null);
    }

    this.genresList$ = this.genre.list();
  }

  /**
   * To use when we want to test data in html
   * @param data something to display
   */
  public console(data: any) {
    console.log(data);
  }

  /**
   * Add or remove a movie of watched list when we click on a toggle button
   * @param id id of a movie
   * @param watchedlist the watchedList component
   */
  public addWatched(id: number, watchedlist: any) {
    this.setStorageWatched();
    if(!this.storageWatched.includes(id)){
      this.storageWatched.push(id);
    } else {
      let index = this.storageWatched.indexOf(id);
      this.storageWatched.splice(index,1);
    }
    localStorage.setItem('watched', JSON.stringify(this.storageWatched));
    //put the movie in the watched list to display on 'Watched movies' tab
    watchedlist.getMoviesWatched();
  }

  /**
   * Add or remove a movie of watched list when we click on a toggle button
   * @param id id of a movie
   * @param towatchlist the toWatchList Component
   */
  public addToWatch(id: number, towatchlist: any) {
    this.setStorageToWatch();
    if(!this.storageToWatch.includes(id)){
      this.storageToWatch.push(id);
    } else {
      let index = this.storageToWatch.indexOf(id);
      this.storageToWatch.splice(index,1);
    }
    localStorage.setItem('toWatch', JSON.stringify(this.storageToWatch));
    //put the movie in the watched list to display on 'Movies To Watch' tab
    towatchlist.getMoviesToWatch();
  }

  /**
   * To keep watched toggle button pressed if the movie we test is in the watched list
   * @param id the identifier of a media
   * @returns true if the media is watched by the user
   */
  public isWatched(id: number): boolean {
    return JSON.parse(localStorage.getItem('watched')) && JSON.parse(localStorage.getItem('watched')).includes(id);
  }

  /**
   * To keep toWatch toggle button pressed if the movie we test is in the toWatch list
   * @param id the identifier of a media
   * @returns true if the media is watched by the user
   */
  public isToWatch(id: number): boolean {
    return(JSON.parse(localStorage.getItem('toWatch')) && JSON.parse(localStorage.getItem('toWatch')).includes(id));
  }

  /**
   * Put local storage content in an array, for watched movies
   */
  public setStorageWatched() {
    if(JSON.parse(localStorage.getItem('watched'))){
      this.storageWatched = JSON.parse(localStorage.getItem('watched'));
    } 
  }

  /**
   * Put local storage content in an array, for toWatch movies
   */
  public setStorageToWatch() {
    if(JSON.parse(localStorage.getItem('toWatch'))) this.storageToWatch = JSON.parse(localStorage.getItem('toWatch'));
  }

  /**
   * Split year from complete date
   * @param releaseDate the release date of a movie
   * @returns only the year part of the date
   */
  public getYear(releaseDate: string) {
    let releaseDateSplit = releaseDate.split('-');
    let year = releaseDateSplit[0];
    return year;
  }

  /**
   * Test if one of the genre selected in the filter is associated to each movie
   * @param filterGenres 
   * @param res 
   */
  public filterMoviesByGenre(filterGenres: any[], res: Object) {
    var i = 0;
    this.genreIDs = [];
    //push the ids of each genre selected in an array
    filterGenres.map(genre => {
      this.genreIDs.push(genre.id);
    });
    //Only keep movies where at least one of the genres associated with is selected in the filter
    this.moviesAfterGenreFilter = (res as any).results.filter(movie => {
      movie.genre_ids.map(id => {
        this.genreIDs.includes(id) ? i++ : '';
      })
      return i>0;
    })
  }

  //Comparing the year of the release date of the film with the year in filter input
  public filterMoviesByReleaseDateAfter(filterYear, res) {
    this.moviesAfterGenreFilter = res.filter(movie => this.getYear(movie.release_date) >= filterYear.toString())
  }

  public filterMoviesByReleaseDateBefore(filterYear, res) {
    this.moviesAfterGenreFilter = res.filter(movie => this.getYear(movie.release_date) < filterYear.toString())
  }

  //Called when the form is submited
  public movieResearch(search: NgForm) {
    //clear release date filters field when they aren't valid input
    if(!search.form.value.filterYearAfter || search.form.value.filterYearAfter>'2019') this.filterReleasedAfter = null;
    if(!search.form.value.filterYearBefore || search.form.value.filterYearBefore>'2020' || search.form.value.filterYearBefore<=search.form.value.filterYearAfter) this.filterReleasedBefore = null;

    //This will search through the database based on the 'name of the movie' input, and then we apply filters on the result
    if (!search.form.value.searchMovie) {
      return;
    }

    this.http.get('https://api.themoviedb.org/3/search/movie?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US&include_adult=false&query=' + search.form.value.searchMovie).subscribe(res => {
      this.dataMovie = [];
      if(search.form.value.filterGenres && search.form.value.filterGenres.length!=0) {
        console.log(search.form.value.filterGenres);
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

  //Show the list of top popular movies by default
  public getPopularMovies(search: NgForm) {
    this.http.get('https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8').subscribe(res => {
      this.extraction(res, this.nbDisplay);
    });
  }

  //Only 10 movies will be displayed on the screen
  public extraction(movies, nbDisplay) {
    if(movies.results) {
      //depending on where extraction() is called, movies will sometimes already be 'movies.results'
      this.extract = movies.results.slice(0,nbDisplay);
      movies = movies.results;
    } else {
      this.extract = movies.slice(0,nbDisplay);
    }
    this.getMovieDetails(this.extract);
  }

  //Put details of every movie shown on the screen in an array
  public getMovieDetails(movies) {
    let me = this; //to avoid 'this is undefined' error
    movies.forEach(function(movie) {
      me.http.get('https://api.themoviedb.org/3/movie/' + movie.id + '?language=en-US&api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8').subscribe(res => {
        me.dataMovie.push(res);
      });
    })
  }

  //Launch InformationsComponent on a modal when we click on 'More details' button
  public openDialog(result): void {
    const dialogRef = this.dialog.open(InformationsComponent, {
      width: '450px',
      data: result
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
