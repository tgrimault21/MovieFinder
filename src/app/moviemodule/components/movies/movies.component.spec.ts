import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, API_KEY } from 'src/app/shared/services/tokens';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterService } from 'src/app/shared/services/filter/filter.service';
import { MockFilterService } from 'src/app/shared/services/filter/filter.service.mock';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { MockMovieService } from 'src/app/shared/services/movie/movie.service.mock';

const mockHttpClient = {
  get: (url: string) => of(url)
};

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let filter: FilterService;
  let movie: MovieService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ MoviesComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: API_BASE_URL, useValue: 'https://api.themoviedb.org/3' },
        { provide: API_KEY, useValue: 'abc' },
        { provide: FilterService, useClass: MockFilterService },
        { provide: MovieService, useClass: MockMovieService }
      ]
    });
    filter = TestBed.get(FilterService);
    movie = TestBed.get(MovieService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should return popular movies', done => {
      spyOn(movie, 'listPopular').and.returnValue(of({
        results: [{
          id: 1
        }]
      }));
      spyOn(movie, 'fetch').and.returnValue(of({
        id: 1
      }));
      filter.filterChange = of({
        text: '',
        genre: [],
        releasedAfter: 2000,
        releasedBefore: 2020
      });
      component.ngOnInit();
      component.dataMovie$.subscribe(res => {
        expect(res).toEqual([{
          id: 1
        }]);
        done();
      });
    });

    it('should return popular movies', done => {
      filter.filterChange = of({});
      spyOn(movie, 'listPopular').and.returnValue(of({
        results: [{
          id: 1
        }]
      }));
      spyOn(movie, 'fetch').and.returnValue(of({
        id: 1
      }));
      component.ngOnInit();
      component.dataMovie$.subscribe(res => {
        expect(res).toEqual([{
          id: 1
        }]);
        done();
      });
    });

    it('should return []', done => {
      filter.filterChange = of({});
      spyOn(movie, 'listPopular').and.returnValue(of({
        results: []
      }));
      component.ngOnInit();
      component.dataMovie$.subscribe(res => {
        expect(res).toEqual([]);
        done();
      });
    });

    it('should return movie research', done => {
      spyOn(filter, 'filterMovies').and.returnValue([1]);
      spyOn(movie, 'search').and.returnValue(of({
        results: [{
          id: 1,
          name: 'text'
        }]
      }));
      spyOn(movie, 'fetch').and.returnValue(of({
        id: 1,
        title: 'text'
      }));
      filter.filterChange = of({
        text: 'test',
        genre: [],
        releasedAfter: 2000,
        releasedBefore: 2020
      });
      component.ngOnInit();
      component.dataMovie$.subscribe(res => {
        expect(res).toEqual([{
          id: 1,
          title: 'text'
        }]);
        done();
      });
    });
  });
});
