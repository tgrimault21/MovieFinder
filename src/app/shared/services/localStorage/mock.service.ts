import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',

})
export class MockService {

  public getItem(query: string): string {
    return '[]';
  }

  public setItem(query: string, item: string) {

  }
}
