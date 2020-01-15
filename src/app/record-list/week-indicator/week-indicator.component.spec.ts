import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeekIndicatorComponent } from './week-indicator.component';

describe('WeekIndicatorComponent', () => {
  @Pipe({ name: 'translate' })
  class MockedTranslatePipe implements PipeTransform {
    transform(value: any, ...args): any {
      return value;
    }
  }

  let fixture: ComponentFixture<WeekIndicatorComponent>;
  let component: WeekIndicatorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekIndicatorComponent, MockedTranslatePipe]
    });

    fixture = TestBed.createComponent(WeekIndicatorComponent);
    component = fixture.componentInstance;

    component.year = 2020;
    component.week = 50;
    component.from = '1577833200000'; // 1.1.2020
    component.to = '1578178799000'; // 4.1.2020

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
