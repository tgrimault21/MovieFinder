import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { Movie, Response } from '../movie/movie.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { of, Observable } from 'rxjs';

describe('FilterService', () => {
  let filter: FilterService;
  let response: Response<Movie>;
  let router: Router;
  const params: Observable<Params> = of({});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          queryParams: params
        }}
      ]
    });
    router = TestBed.get(Router);
    // const activatedRoute = TestBed.get(ActivatedRoute);
    // activatedRoute.queryParams = new Subject();
    // filter = new FilterService(router, activatedRoute);
    filter = TestBed.get(FilterService);

    response = {
      results: [{
        id: 1,
        genre_ids: [10, 20],
        release_date: '2010'
      },
      {
        id: 2,
        genre_ids: [20],
        release_date: '2000'
      },
      {
        id: 3,
        genre_ids: [10, 30],
        release_date: '2008'
      }]
    };
  });

  it('should create an instance', () => {
    expect(filter).toBeTruthy();
  });

  it('should set default params', done => {
    filter.filterChange.subscribe(res => {
      expect(res).toEqual({
        text: '',
        genre: [],
        releasedAfter: 2000,
        releasedBefore: 2020
       });
      done();
      });
  });

  describe('#filterMovies', () => {
    it('should filter movies by genre', () => {
      const filtered = filter.filterMovies(response, {genre: [10]});
      expect(filtered).toEqual([1, 3]);
    });

    it('should not filter movies', () => {
      const filtered = filter.filterMovies(response, {});
      expect(filtered).toEqual([1, 2, 3]);
    });

    it('should filter movies by release date before date input', () => {
      const filtered = filter.filterMovies(response, {releasedBefore: 2005});
      expect(filtered).toEqual([2]);
    });

    it('should filter movies by release date after date input', () => {
      const filtered = filter.filterMovies(response, {releasedAfter: 2005});
      expect(filtered).toEqual([1, 3]);
    });

    it('should filter movies by release date before date input', () => {
      const filtered = filter.filterMovies(response, {genre: [10], releasedBefore: 2005, releasedAfter: 1900});
      expect(filtered).toEqual([]);
    });
  });

  describe('#takeIdOutOfMovies', () => {
    it('should convert movies onto ids', () => {
      const ids =  filter.takeIdOutOfMovies(response.results);
      expect(ids).toEqual([1, 2, 3]);
    });
  });

  describe('#sendForm', () => {
    it('should redirect to /list route with params', () => {
      const navigateSpy = spyOn(router, 'navigate');
      filter.sendForm({text: 'test', genre: [10], releasedAfter: 2000, releasedBefore: 2020});
      // tslint:disable-next-line: max-line-length
      expect(navigateSpy).toHaveBeenCalledWith([ '/list' ], { queryParams: { movie: 'test', genres: 'MTA=', releasedafter: 2000, releasedbefore: 2020 } });
    });

    it('should redirect to /list route with no params', () => {
      const navigateSpy = spyOn(router, 'navigate');
      filter.sendForm({});
      // tslint:disable-next-line: max-line-length
      expect(navigateSpy).toHaveBeenCalledWith([ '/list' ], { queryParams: { movie: undefined, genres: '', releasedafter: undefined, releasedbefore: undefined } });
    });
  });
});

describe('#FilterService', () => {
  let filter: FilterService;
  let router: Router;
  const params: Observable<Params> = of({
    movie: 'oui',
    genres: 'MQ==',
    releasedafter: '2001',
    releasedbefore: '2019'
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          queryParams: params
        }}
      ]
    });
    router = TestBed.get(Router);
    // const activatedRoute = TestBed.get(ActivatedRoute);
    // activatedRoute.queryParams = new Subject();
    // filter = new FilterService(router, activatedRoute);
    filter = TestBed.get(FilterService);
  });

  it('should set default params', done => {
    filter.filterChange.subscribe(res => {
      expect(res).toEqual({
        text: 'oui',
        genre: [1],
        releasedAfter: 2001,
        releasedBefore: 2019
       });
      done();
      });
  });
});

describe('#FilterService', () => {
  let filter: FilterService;
  let router: Router;
  const params: Observable<Params> = of({
    movie: 'oui',
    genres: '',
    releasedafter: '2001',
    releasedbefore: '2019'
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          queryParams: params
        }}
      ]
    });
    router = TestBed.get(Router);
    // const activatedRoute = TestBed.get(ActivatedRoute);
    // activatedRoute.queryParams = new Subject();
    // filter = new FilterService(router, activatedRoute);
    filter = TestBed.get(FilterService);
  });

  it('should set default params', done => {
    filter.filterChange.subscribe(res => {
      expect(res).toEqual({
        text: 'oui',
        genre: [],
        releasedAfter: 2001,
        releasedBefore: 2019
       });
      done();
      });
  });
});
