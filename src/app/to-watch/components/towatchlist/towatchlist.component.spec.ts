import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowatchlistComponent } from './towatchlist.component';

describe('TowatchlistComponent', () => {
  let component: TowatchlistComponent;
  let fixture: ComponentFixture<TowatchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowatchlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TowatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
