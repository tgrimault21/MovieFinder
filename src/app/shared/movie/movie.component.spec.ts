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
});
