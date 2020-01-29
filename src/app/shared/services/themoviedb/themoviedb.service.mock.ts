import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockTheMovieDbService {
  public get<T>(url: string, options: { [key: string]: string } = {}): Observable<T> {
    return of(undefined);
  }
}
