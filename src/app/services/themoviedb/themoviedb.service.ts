import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_KEY } from '../tokens';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL)
    private apiBaseUrl: string,
    @Inject(API_KEY)
    private apiKey: string,
    @Inject(LOCALE_ID)
    private locale: string
  ) {}

  public get<T>(url: string, param1: string = '', param2: string = ''): Observable<T> {
    return this.http.get<T>(this.getFullUrl(url, param1, param2));
  }

  private getFullUrl(root: string, param1: string, param2: string): string {
    return this.apiBaseUrl + root + '?api_key=' + this.apiKey + '&language=' + this.locale + param1 + param2;
  }
}
