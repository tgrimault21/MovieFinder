import { Injectable } from '@angular/core';
import { Movie, Movies, Response, MovieService } from '../movie/movie.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, forkJoin, of, Subject, BehaviorSubject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Genre } from '../genre/genre.service';

export interface Filters {
  text?: string;
  genre?: Genre[];
  releasedAfter?: number;
  releasedBefore?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {

  private genreIDs: number[] = [];
  private moviesAfterGenreFilter: Movies = [];

  public sendNewForm = new BehaviorSubject<Filters>({});

  constructor(
    private movie: MovieService
  ) {}

  public filterMovies(res: Response<Movie>, form: Filters): number[] {
    if (form.genre && form.genre.length !== 0) {
      this.filterMoviesByGenre(form.genre, res);
    } else {
      this.moviesAfterGenreFilter = res.results;
    }

    if (form.releasedAfter) {
      this.filterMoviesByReleaseDateAfter(form.releasedAfter, this.moviesAfterGenreFilter);
    }

    if (form.releasedBefore) {
      this.filterMoviesByReleaseDateBefore(form.releasedBefore, this.moviesAfterGenreFilter);
    }

    return this.takeIdOutOfMovies(this.moviesAfterGenreFilter);
  }

  /**
   * Only 10 movies will be displayed on the screen
   * @param movies list of movie ids
   * @param nbDisplay number of movies to display on screen
   */
  public extraction(movies: number[], nbDisplay: number): Observable<Movies> {
    return this.getMovieDetails(movies.splice(0, nbDisplay));
  }

  /**
   * Put details of every movie shown on the screen in an array
   * @param movies list of 10 ids
   */
  private getMovieDetails(movies: number[]): Observable<Movies> {
    if (movies.length === 0) {
      return of([]);
    }

    return forkJoin(
      movies.map( movieId => this.movie.fetch(movieId))
    );
  }

 /**
  * Comparing the year of the release date of the film with the year in filter input
  * @param filterYear input in the form
  * @param res movies filtered by name and genre
  */
 private filterMoviesByReleaseDateAfter(filterYear: number, res: Movies) {
   this.moviesAfterGenreFilter = res.filter(movie => this.getYear(movie.release_date) >= filterYear);
 }

 /**
  * Comparing the year of the release date of the film with the year in filter input
  * @param filterYear input in the form
  * @param res movies filtered by name and genre
  */
 private filterMoviesByReleaseDateBefore(filterYear: number, res: Movies) {
   this.moviesAfterGenreFilter = res.filter(movie => this.getYear(movie.release_date) < filterYear);
 }

 /**
  * Take ids out of movies sent
  * @param movies movies you want to take ids from
  * @returns array of movie ids
  */
 public takeIdOutOfMovies(movies: Movies): number[] {
   return movies.map(res => res.id);
 }

  /**
   * Split year from complete date
   * @param releaseDate the release date of a movie
   * @returns only the year part of the date
   */
  private getYear(releaseDate: string): number {
    return parseInt(releaseDate.split('-')[0], 10);
  }

  /**
   * Test if one of the genre selected in the filter is associated to each movie
   * @param filterGenres genres checked in the form
   * @param res response from the API
   */
  private filterMoviesByGenre(filterGenres: any[], res: Response<Movie>) {
    // push the ids of each genre selected in an array
    this.genreIDs = filterGenres.map(genre => genre.id);

    // Only keep movies where at least one of the genres associated with is selected in the filter
    this.moviesAfterGenreFilter = res.results.filter(movie => {
      return movie.genre_ids.some(id => this.genreIDs.includes(id));
    });
  }

  public sendForm(search: Filters) {
    this.sendNewForm.next(search);
  }
}
