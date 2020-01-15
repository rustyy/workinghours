import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgComponent } from './svg.component';

describe('SvgComponent', () => {
  let component: SvgComponent;
  let fixture: ComponentFixture<SvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SvgComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SvgComponent);
    component = fixture.componentInstance;

    component.name = 'foo';
    component.size = 'small';

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct size-modifier', () => {
    expect(fixture.nativeElement.classList.contains('app-svg--small')).toBeTrue();
  });

  it('should refer to the correct symbol in xlink:href', () => {
    const useEl = fixture.nativeElement.querySelector('use');
    expect(useEl.getAttribute('xlink:href')).toBe('#symbol-icon-foo');
  });
});
