// @ts-nocheck
import { FlexContainerDirective } from './flex-container.directive';
import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div appFlexContainer>
      <div></div>
      <div></div>
    </div>
  `,
})
class TestComponent {}

let fixture: ComponentFixture<TestComponent>;
let elements: ElementRef[];

describe('FlexContainerDirective', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [FlexContainerDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();
    elements = fixture.debugElement.queryAll(By.directive(FlexContainerDirective));
  });

  it('should have one element with flex-directive', () => {
    expect(elements.length).toBe(1);
  });

  it('should have two child-elements', () => {
    expect(elements[0].nativeElement.children.length).toBe(2);
  });

  it('should have set display flex on directive host', () => {
    expect(elements[0].nativeElement.style.display).toBe('flex');
  });

  it('should have set justify-content to space-between on directive host', () => {
    expect(elements[0].nativeElement.style.justifyContent).toBe('space-between');
  });

  it('should set flex-grow, flex-basis and width for child-elements', () => {
    const hostElement = elements[0].nativeElement;
    Array.from(hostElement.children).forEach((child: HTMLElement) => {
      expect(child.style.flexGrow).toBe('0');
      expect(child.style.flexBasis).toBe('46%');
      expect(child.style.width).toBe('46%');
    });
  });
});
