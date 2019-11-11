import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekIndicatorComponent } from './week-indicator.component';

describe('WeekIndicatorComponent', () => {
  let component: WeekIndicatorComponent;
  let fixture: ComponentFixture<WeekIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeekIndicatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
