import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsComponent } from './informations.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { API_BASE_URL, API_KEY } from 'src/app/shared/services/tokens';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { MockMovieService } from 'src/app/shared/services/movie/movie.service.mock';

const mockHttpClient = {
  get: (url: string) => of(url)
};

function createModule(data: any = {id: 1}) {
  TestBed.configureTestingModule({
    declarations: [ InformationsComponent ],
    schemas: [ NO_ERRORS_SCHEMA ],
    providers: [
      { provide: MatDialogRef },
      { provide: MAT_DIALOG_DATA },
      { provide: HttpClient, useValue: mockHttpClient },
      { provide: API_BASE_URL, useValue: 'https://api.themoviedb.org/3' },
      { provide: API_KEY, useValue: 'abc' },
      { provide: MAT_DIALOG_DATA, useValue: data },
      { provide: MovieService, useClass: MockMovieService }
    ]
  });
}

describe('InformationsComponent', () => {
  let component: InformationsComponent;
  let fixture: ComponentFixture<InformationsComponent>;
  let movie: MovieService;

  beforeEach(async(() => {
    createModule();
    movie = TestBed.get(MovieService);
    spyOn(movie, 'fetchCredits').and.returnValue(of({id: 1, crew: [{department: 'Directing'}], cast: [{name: ''}]}));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should get movie credits', done => {
      component.ngOnInit();
      component.movieCredits$.subscribe(res => {
        expect(res).toEqual({
          id: 1,
          cast: [{name: ''}],
          crew: [{department: 'Directing'}]
        });
        done();
      });
    });

    it('should get directors', done => {
      component.ngOnInit();
      component.director$.subscribe(res => {
        expect(res).toEqual([{department: 'Directing'}]);
        done();
      });
    });

    it('should get actors', done => {
      component.ngOnInit();
      component.actors$.subscribe(res => {
        expect(res).toEqual([{name: ''}]);
        done();
      });
    });
  });
});

describe('InformationComponent', () => {
  let component: InformationsComponent;
  let fixture: ComponentFixture<InformationsComponent>;

  beforeEach(async(() => {
    createModule({});
  }));

  beforeEach(() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(InformationsComponent);
    component = fixture.componentInstance;
  });
  describe('#ngOnInit', () => {
    it('should return undefined', () => {
      component.ngOnInit();
      expect(component.movieCredits$).toBeUndefined();
    });
  });
});
