import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  exportAs: 'appButton',
})
export class ButtonComponent implements OnInit {
  @Input() size = '';
  @Input() modifier: string[] = [];
  hostEl: HTMLElement;
  baseClassName = 'button';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.hostEl = this.el.nativeElement;
  }

  ngOnInit() {
    const mods = [...this.modifier, this.size].filter(Boolean).map(this.generateModifierClass);
    [this.baseClassName, ...mods].forEach(this.addClassToHost);
  }

  private addClassToHost = (modifier: string) => {
    this.renderer.addClass(this.hostEl, modifier);
  };

  private generateModifierClass = (modifier: string) => `${this.baseClassName}--${modifier}`;
}
