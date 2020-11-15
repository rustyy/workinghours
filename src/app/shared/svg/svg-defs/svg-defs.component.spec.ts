import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SvgDefsComponent } from './svg-defs.component';

describe('SvgDefsComponent', () => {
  let component: SvgDefsComponent;
  let fixture: ComponentFixture<SvgDefsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SvgDefsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
