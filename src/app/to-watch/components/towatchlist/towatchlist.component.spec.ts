import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowatchlistComponent } from './towatchlist.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, API_KEY } from 'src/app/shared/services/tokens';
import { of } from 'rxjs';
import { LibraryService } from 'src/app/shared/services/library/library.service';
import { MockLibraryService } from 'src/app/shared/services/library/library.service.mock';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { MockMovieService } from 'src/app/shared/services/movie/movie.service.mock';

const mockHttpClient = {
  get: (url: string) => of(url)
};

describe('TowatchlistComponent', () => {
  let component: TowatchlistComponent;
  let fixture: ComponentFixture<TowatchlistComponent>;
  let library: LibraryService;
  let movie: MovieService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowatchlistComponent ],
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
    fixture = TestBed.createComponent(TowatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should return movies to watch', done => {
      library.toWatchListChange.next([1]);
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
      library.toWatchListChange.next([]);
      component.movieList$.subscribe(res => {
        expect(res).toEqual([]);
        done();
      });
    });

    it('should call loadToWatch', () => {
      const toWatchSpy = spyOn(library.toWatchListChange, 'next');
      component.ngOnInit();
      expect(toWatchSpy).toHaveBeenCalledWith([1]);
    });
  });
});
