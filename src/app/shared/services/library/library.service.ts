import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  public toWatchListChange = new BehaviorSubject<number[]>([]);
  public watchedListChange = new BehaviorSubject<number[]>([]);

  private storageWatched: number[] = [];
  private storageToWatch: number[] = [];

  /**
   * Add or remove a movie of watched list when we click on a toggle button
   * @param id id of a movie
   * @param watchedlist the watchedList component
   */
  public toggleWatched(id: number) {
    if (!this.storageWatched.includes(id)) {
      this.storageWatched.push(id);
    } else {
      const index = this.storageWatched.indexOf(id);
      this.storageWatched.splice(index, 1);
    }
    localStorage.setItem('watched', JSON.stringify(this.storageWatched));


    // put the movie in the watched list to display on 'Watched movies' tab
    this.watchedListChange.next(this.storageWatched);
  }

  /**
   * Add or remove a movie of watched list when we click on a toggle button
   * @param id id of a movie
   * @param towatchlist the toWatchList Component
   */
  public toggleToWatch(id: number) {
    if (!this.storageToWatch.includes(id)) {
      this.storageToWatch.push(id);
    } else {
      const index = this.storageToWatch.indexOf(id);
      this.storageToWatch.splice(index, 1);
    }

    localStorage.setItem('toWatch', JSON.stringify(this.storageToWatch));
    // put the movie in the watched list to display on 'Movies To Watch' tab
    this.toWatchListChange.next(this.storageToWatch);
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
    return JSON.parse(localStorage.getItem('toWatch')) && JSON.parse(localStorage.getItem('toWatch')).includes(id);
  }

  /**
   * Put local storage content in an array, for watched movies
   */
  public loadWatched() {
    let watched: number[] = [];

    try {
      watched = JSON.parse(localStorage.getItem('watched'));
    } catch (e) {}

    this.storageWatched = watched || [];
    this.watchedListChange.next(this.storageWatched);
  }

  /**
   * Put local storage content in an array, for toWatch movies
   */
  public loadToWatch() {
    let toWatch: number[] = [];

    try {
      toWatch = JSON.parse(localStorage.getItem('toWatch'));
    } catch (e) {}

    this.storageToWatch = toWatch || [];
    this.toWatchListChange.next(this.storageToWatch);
  }
}
