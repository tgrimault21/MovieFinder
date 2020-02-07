import { TestBed } from '@angular/core/testing';
import { LibraryService } from './library.service';
import { LocalStorageService } from '../localStorage/localStorage.service';
import { MockService } from '../localStorage/mock.service';

describe('Library', () => {
  let library: LibraryService;
  let local: LocalStorageService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useClass: MockService}
      ]
    });
    library = TestBed.get(LibraryService);
    local = TestBed.get(LocalStorageService);
  });

  it('should create an instance', () => {
    expect(library).toBeTruthy();
  });

  describe('toggleWatched', () => {
    it('should add a movie id in storage', () => {
      const watchedSpy = spyOn(library.watchedListChange, 'next');
      library.toggleWatched(20);
      expect(watchedSpy).toHaveBeenCalledWith([20]);
    });

    it('should remove a movie id in storage', () => {
      const watchedSpy = spyOn(library.watchedListChange, 'next');
      library.toggleWatched(20);
      library.toggleWatched(20);
      expect(watchedSpy).toHaveBeenCalledWith([]);
    });
  });

  describe('toggleToWatch', () => {
    it('should add a movie id in storage', () => {
      const toWatchSpy = spyOn(library.toWatchListChange, 'next');
      library.toggleToWatch(20);
      expect(toWatchSpy).toHaveBeenCalledWith([20]);
    });

    it('should remove a movie id in storage', () => {
      const toWatchSpy = spyOn(library.toWatchListChange, 'next');
      library.toggleToWatch(20);
      library.toggleToWatch(20);
      expect(toWatchSpy).toHaveBeenCalledWith([]);
    });
  });

  describe('loadWatched', () => {
    it('should load watched storage', () => {
      const watchedSpy = spyOn(library.watchedListChange, 'next');
      spyOn(local, 'getItem').and.returnValue('"[10,20]"');
      library.loadWatched();
      expect(watchedSpy).toHaveBeenCalledWith('[10,20]');
    });
  });

  describe('loadToWatch', () => {
    it('should load toWatch storage', () => {
      const toWatchSpy = spyOn(library.toWatchListChange, 'next');
      spyOn(local, 'getItem').and.returnValue('"[10,20]"');
      library.loadToWatch();
      expect(toWatchSpy).toHaveBeenCalledWith('[10,20]');
    });
  });
});
