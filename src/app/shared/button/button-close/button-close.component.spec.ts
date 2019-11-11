import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCloseComponent } from './button-close.component';

describe('ButtonCloseComponent', () => {
  let component: ButtonCloseComponent;
  let fixture: ComponentFixture<ButtonCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonCloseComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
