import { LocalStorageService } from './localStorage.service';
import { TestBed } from '@angular/core/testing';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = TestBed.get(LocalStorageService);
  });

  describe('getItem', () => {
    it('should get localStorage', () => {
      localStorage.setItem('watched', JSON.stringify([10, 20]));
      const ids = service.getItem('watched');
      expect(ids).toEqual('[10,20]');
    });
  });

  describe('setItem', () => {
    it('should set localStorage', () => {
      service.setItem('watched', JSON.stringify([10, 20]));
      const ids = localStorage.getItem('watched');
      expect(ids).toEqual('[10,20]');
    });
  });
});
