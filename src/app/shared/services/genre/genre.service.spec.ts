import { TestBed } from '@angular/core/testing';
import { TheMovieDbService } from '../themoviedb/themoviedb.service';
import { MockTheMovieDbService } from '../themoviedb/themoviedb.service.mock';
import { GenreService } from './genre.service';
import { of } from 'rxjs';

describe('GenreService', () => {
  let service: GenreService;
  let dbService: TheMovieDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TheMovieDbService, useClass: MockTheMovieDbService }
      ]
    });

    service = TestBed.get(GenreService);
    dbService = TestBed.get(TheMovieDbService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  describe('list', () => {
    it('should return genre array', done => {
      spyOn(dbService, 'get').and.returnValue(of({
        genres: [{
        id: 28,
        name: 'Action'
      }]}));
      service.list().subscribe(genre => {
        expect(genre).toEqual([{
          id: 28,
          name: 'Action'
        }]);
        done();
      });
    });

    it('should fetch the genres', done => {
      spyOn(dbService, 'get').and.returnValue(of({
        genres: [{
        id: 28,
        name: 'Action'
      }]}));
      service.list().subscribe(() => {
        expect(dbService.get).toHaveBeenCalledWith('/genre/movie/list');
        done();
      });
    });
  });
});
