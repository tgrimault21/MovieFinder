import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, API_KEY } from 'src/app/shared/services/tokens';
import { FilterService } from 'src/app/shared/services/filter/filter.service';
import { MockFilterService } from 'src/app/shared/services/filter/filter.service.mock';
import { GenreService } from 'src/app/shared/services/genre/genre.service';
import { MockGenreService } from 'src/app/shared/services/genre/genre.service.mock';

const mockHttpClient = {
  get: (url: string) => of(url)
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let filter: FilterService;
  let genre: GenreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: API_BASE_URL, useValue: 'https://api.themoviedb.org/3' },
        { provide: API_KEY, useValue: 'abc' },
        { provide: LOCALE_ID, useValue: 'en-US' },
        { provide: FilterService, useClass: MockFilterService },
        { provide: GenreService, useClass: MockGenreService }
      ]
    });
    filter = TestBed.get(FilterService);
    genre = TestBed.get(GenreService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should return filters', done => {
      filter.filterChange = of({text: 'test'});
      component.ngOnInit();
      component.filters$.subscribe(res => {
        expect(res).toEqual({name: 'test'});
        done();
      });
    });

    it('should return genres', done => {
      spyOn(genre, 'list').and.returnValue(of([{
        name: '',
        id: 2
      }]));
      component.ngOnInit();
      component.genresList$.subscribe(res => {
        expect(res).toEqual([{
          name: '',
          id: 2
        }]);
        done();
      });
    });

    it('should return error', done => {
      spyOn(genre, 'list').and.returnValue(throwError('error'));
      component.ngOnInit();
      component.genresList$.subscribe({
        error: error => {
         expect(error).toEqual('error');
         done();
        }
      });
    });
  });

  describe('#submitForm', () => {
    it('should set filterReleasedAfter to null', () => {
      component.filterReleasedAfter = 'zerg';
      component.submitForm({name: 'test'});
      expect(component.filterReleasedAfter).toBeNull();
    });

    it('should set filterReleasedBefore to null', () => {
      component.filterReleasedAfter = '2015';
      component.filterReleasedBefore = '2013';
      component.submitForm({name: 'test'});
      expect(component.filterReleasedBefore).toBeNull();
    });

    it('should send correct form', () => {
      component.filterReleasedAfter = '2000';
      component.filterReleasedBefore = '2019';
      component.genres = [{
        id: 28,
        name: 'Action'
      }];
      const spy = spyOn(filter, 'sendForm');
      component.submitForm({name: 'test'});
      expect(spy).toHaveBeenCalledWith({
        text: 'test',
        genre: [28],
        releasedAfter: 2000,
        releasedBefore: 2019
      });
    });
  });
});
