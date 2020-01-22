import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedlistComponent } from './watchedlist.component';

describe('WatchedlistComponent', () => {
  let component: WatchedlistComponent;
  let fixture: ComponentFixture<WatchedlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchedlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
