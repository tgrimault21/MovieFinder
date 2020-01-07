import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiToolsService } from '../api-tools/api-tools.service';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {
  constructor(
    private http: HttpClient,
    private apiTools: ApiToolsService
  ) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.apiTools.getFullUrl(url));
  }
}
