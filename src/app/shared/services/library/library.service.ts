import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../localStorage/localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  public toWatchListChange = new BehaviorSubject<number[]>([]);
  public watchedListChange = new BehaviorSubject<number[]>([]);

  private storageWatched: number[] = [];
  private storageToWatch: number[] = [];

  constructor(
    private localStorage: LocalStorageService
  ) {}

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
    this.localStorage.setItem('watched', JSON.stringify(this.storageWatched));


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

    this.localStorage.setItem('toWatch', JSON.stringify(this.storageToWatch));
    // put the movie in the watched list to display on 'Movies To Watch' tab
    this.toWatchListChange.next(this.storageToWatch);
  }

  /**
   * Put local storage content in an array, for watched movies
   */
  public loadWatched() {
    let watched: number[] = [];
    const data = this.localStorage.getItem('watched');
    try {
      watched = JSON.parse(data);
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
      toWatch = JSON.parse(this.localStorage.getItem('toWatch'));
    } catch (e) {}

    this.storageToWatch = toWatch || [];
    this.toWatchListChange.next(this.storageToWatch);
  }
}
