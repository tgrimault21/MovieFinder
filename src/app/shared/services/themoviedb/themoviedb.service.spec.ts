import { TheMovieDbService } from "./themoviedb.service";
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { API_BASE_URL, API_KEY } from '../tokens';
import { LOCALE_ID } from '@angular/core';

const mockHttpClient = {
  get: (url: string) => of(url)
};

describe('MovieService', () => {
  let dbService: TheMovieDbService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: API_BASE_URL, useValue: 'https://api.themoviedb.org/3' },
        { provide: API_KEY, useValue: 'abc' },
        { provide: LOCALE_ID, useValue: 'en-US' }
      ]
    });
    dbService = TestBed.get(TheMovieDbService);
    http = TestBed.get(HttpClient);
  });

  describe('get', () => {
   it('should call API', done => {
     spyOn(http, 'get').and.callThrough();
     dbService.get('/').subscribe(res => {
      expect(res).toEqual('https://api.themoviedb.org/3/?api_key=abc&language=en-US');
      done();
     });
   });
  });
});
