import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedlistComponent } from './watchedlist.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { API_BASE_URL, API_KEY } from 'src/app/shared/services/tokens';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { MockLibraryService } from 'src/app/shared/services/library/library.service.mock';
import { MockMovieService } from 'src/app/shared/services/movie/movie.service.mock';
import { LibraryService } from 'src/app/shared/services/library/library.service';

const mockHttpClient = {
  get: (url: string) => of(url)
};

describe('WatchedlistComponent', () => {
  let component: WatchedlistComponent;
  let fixture: ComponentFixture<WatchedlistComponent>;
  let library: LibraryService;
  let movie: MovieService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchedlistComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: API_BASE_URL, useValue: 'https://api.themoviedb.org/3' },
        { provide: API_KEY, useValue: 'abc' },
        { provide: LibraryService, useClass: MockLibraryService },
        { provide: MovieService, useClass: MockMovieService }
      ]
    });
    library = TestBed.get(LibraryService);
    movie = TestBed.get(MovieService);
    spyOn(movie, 'fetch').and.returnValue(of({
      id: 1
    }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should return movies to watch', done => {
      library.watchedListChange.next([1]);
      component.ngOnInit();
      component.movieList$.subscribe(res => {
        expect(res).toEqual([{
          id: 1
        }]);
        done();
      });
    });

    it('should return []', done => {
      component.ngOnInit();
      library.watchedListChange.next([]);
      component.movieList$.subscribe(res => {
        expect(res).toEqual([]);
        done();
      });
    });

    it('should call loadWatched', () => {
      const watchedSpy = spyOn(library.watchedListChange, 'next');
      component.ngOnInit();
      expect(watchedSpy).toHaveBeenCalledWith([1]);
    });
  });
});
