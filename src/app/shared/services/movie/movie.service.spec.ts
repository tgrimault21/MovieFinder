import { MovieService } from './movie.service';
import { TestBed } from '@angular/core/testing';
import { TheMovieDbService } from '../themoviedb/themoviedb.service';
import { MockTheMovieDbService } from '../themoviedb/themoviedb.service.mock';
import { of } from 'rxjs';

describe('MovieService', () => {
  let service: MovieService;
  let dbService: TheMovieDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TheMovieDbService, useClass: MockTheMovieDbService }
      ]
    });
    service = TestBed.get(MovieService);
    dbService = TestBed.get(TheMovieDbService);
  });

  describe('listPopular', () => {
    it('should return popular movies', done => {
      spyOn(dbService, 'get').and.returnValue(of({
        results: [{
          id: 1
        }]
      }));
      service.listPopular().subscribe(res => {
        expect(res).toEqual({
          results: [{
            id: 1
          }]
        });
        done();
      });
    });

    it('should fetch the popular movies', done => {
      spyOn(dbService, 'get').and.returnValue(of({
        results: [{}]
      }));
      service.listPopular().subscribe(() => {
        expect(dbService.get).toHaveBeenCalledWith('/movie/popular');
        done();
      });
    });
  });

  describe('search', () => {
    it('should return movies searched by name', done => {
      spyOn(dbService, 'get').and.returnValue(of({
        results: [{
          id: 1
        }]
      }));
      service.search('test').subscribe(res => {
        expect(res).toEqual({
          results: [{
            id: 1
          }]
        });
        done();
      });
    });

    it('should fetch movies by their name', done => {
      spyOn(dbService, 'get').and.returnValue(of({
        results: [{}]
      }));
      service.search('test').subscribe(() => {
        expect(dbService.get).toHaveBeenCalledWith('/search/movie', '&include_adult=false', '&query=' + 'test');
        done();
      });
    });

  });

  describe('fetch', () => {
    it('should return movie details', done => {
      spyOn(dbService, 'get').and.returnValue(of({
          title: '',
          runtime: 90,
          release_date: '',
          id: 1,
          poster_path: '',
          overview: ''
      }));
      service.fetch(1).subscribe(res => {
        expect(res).toEqual({
          title: '',
          runtime: 90,
          release_date: '',
          id: 1,
          poster_path: '',
          overview: ''
        });
        done();
      });
    });

    it('should fetch the movie by its id', done => {
      spyOn(dbService, 'get').and.returnValue(of({
        id: 1
      }));
      service.fetch(1).subscribe(() => {
        expect(dbService.get).toHaveBeenCalledWith('/movie/1');
        done();
      });
    });
  });

  describe('fetchCredits', () => {
    it('should return movie credits', done => {
      spyOn(dbService, 'get').and.returnValue(of({
          id: 1,
          cast: [{
            name: ''
          }],
          crew: [{
            department: ''
          }]
      }));
      service.fetchCredits(1).subscribe(res => {
        expect(res).toEqual({
          id: 1,
          cast: [{
            name: ''
          }],
          crew: [{
            department: ''
          }]
        });
        done();
      });
    });

    it('should fetch the movie credits by its id', done => {
      spyOn(dbService, 'get').and.returnValue(of({
        id: 1
      }));
      service.fetchCredits(1).subscribe(() => {
        expect(dbService.get).toHaveBeenCalledWith('/movie/1' + '/credits');
        done();
      });
    });
  });
});
