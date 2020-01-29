import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { LibraryService } from '../services/library/library.service';
import { MockLibraryService } from '../services/library/library.service.mock';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let library: LibraryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: LibraryService, useClass: MockLibraryService }
      ]
    });
    library = TestBed.get(LibraryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnChanges', () => {
    it('should set isWatched and isToWatch to true', () => {
      component.movie = {
        id: 1,
      };
      spyOn(library, 'isWatched').and.returnValue(true);
      spyOn(library, 'isToWatch').and.returnValue(true);
      component.ngOnChanges();
      expect(component.isWatched && component.isToWatch).toBeTruthy();
    });
  });

  describe('#addWatched', () => {
    it('should call toggleWatched', () => {
      const watchedSpy = spyOn(library.watchedListChange, 'next');
      component.addWatched(1);
      expect(watchedSpy).toHaveBeenCalledWith([1]);
    });
  });

  describe('#addToWatch', () => {
    it('should call toggleToWatch', () => {
      const toWatchSpy = spyOn(library.toWatchListChange, 'next');
      component.addToWatch(2);
      expect(toWatchSpy).toHaveBeenCalledWith([2]);
    });
  });
});
