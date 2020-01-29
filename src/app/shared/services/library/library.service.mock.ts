import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockLibraryService {
  public toWatchListChange = new BehaviorSubject<number[]>([]);
  public watchedListChange = new BehaviorSubject<number[]>([]);

  constructor(
  ) {}

  /**
   * Add or remove a movie of watched list when we click on a toggle button
   * @param id id of a movie
   * @param watchedlist the watchedList component
   */
  public toggleWatched(id: number) {
    this.watchedListChange.next([1]);
  }

  /**
   * Add or remove a movie of watched list when we click on a toggle button
   * @param id id of a movie
   * @param towatchlist the toWatchList Component
   */
  public toggleToWatch(id: number) {
    this.toWatchListChange.next([2]);
  }

  /**
   * To keep watched toggle button pressed if the movie we test is in the watched list
   * @param id the identifier of a media
   * @returns true if the media is watched by the user
   */
  public isWatched(id: number): boolean {
    return false;
  }

  /**
   * To keep toWatch toggle button pressed if the movie we test is in the toWatch list
   * @param id the identifier of a media
   * @returns true if the media is watched by the user
   */
  public isToWatch(id: number): boolean {
    return false;
  }

  /**
   * Put local storage content in an array, for watched movies
   */
  public loadWatched() {
    this.watchedListChange.next([1]);
  }

  /**
   * Put local storage content in an array, for toWatch movies
   */
  public loadToWatch() {
    this.toWatchListChange.next([1]);
  }
}
