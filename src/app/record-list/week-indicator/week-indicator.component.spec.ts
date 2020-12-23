import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import moment from 'moment';

import { WeekIndicatorComponent } from './week-indicator.component';

describe('WeekIndicatorComponent', () => {
  @Pipe({ name: 'translate' })
  class MockedTranslatePipe implements PipeTransform {
    transform(value: any): any {
      return value;
    }
  }

  let fixture: ComponentFixture<WeekIndicatorComponent>;
  let component: WeekIndicatorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekIndicatorComponent, MockedTranslatePipe],
    });

    const format = 'DD.MM.YYYY';

    fixture = TestBed.createComponent(WeekIndicatorComponent);
    component = fixture.componentInstance;

    component.year = 2020;
    component.week = 50;
    component.from = moment('01.01.2020', format).valueOf();
    component.to = moment('04.01.2020', format).valueOf();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have correct textContent', () => {
    expect(fixture.nativeElement.textContent).toBe('W 50\n01.01. - 04.01. 2020');
  });

  it('should have one ".text-settled" with correct textContent', () => {
    expect(fixture.nativeElement.children.length).toEqual(1);
    expect(fixture.nativeElement.querySelector('.text--settled').textContent).toBe('01.01. - 04.01. 2020');
  });
});
