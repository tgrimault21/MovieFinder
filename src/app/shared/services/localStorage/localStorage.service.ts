import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',

})
export class LocalStorageService {

  public getItem(query: string): string {
    return localStorage.getItem(query);
  }

  public setItem(query: string, item: string) {
    localStorage.setItem(query, item);
  }
}
