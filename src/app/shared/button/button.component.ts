import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  exportAs: 'appButton',
})
export class ButtonComponent implements OnInit {
  hostEl: HTMLElement;
  baseClassName = 'button';

  @Input() size = '';
  @Input() modifier: string[] = [];

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.hostEl = this.el.nativeElement;
  }

  ngOnInit() {
    this.renderer.addClass(this.hostEl, this.baseClassName);
    this.modifier = [...this.modifier, this.size].filter((id) => id);
    this.modifier.forEach(this.addModifierToHost.bind(this));
  }

  private addModifierToHost(modifier: string) {
    this.renderer.addClass(this.hostEl, this.generateModifierClass(modifier));
  }

  private generateModifierClass(modifier: string) {
    return `${this.baseClassName}--${modifier}`;
  }
}
