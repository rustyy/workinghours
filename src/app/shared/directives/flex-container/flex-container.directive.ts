import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFlexContainer]'
})
export class FlexContainerDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style.justifyContent = 'space-between';
    const children = this.el.nativeElement.children;
    Array.prototype.forEach.call(children, child => {
      this.renderer.setStyle(child, 'flexGrow', '0');
      this.renderer.setStyle(child, 'flexBasis', '46%');
      this.renderer.setStyle(child, 'width', '46%');
    });
  }
}
