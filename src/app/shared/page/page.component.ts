import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  @Input() modifierTop: string[] = [];
  @Input() modifierCenter: string[] = [];
  @Input() modifierBottom: string[] = [];

  get modTop(): string[] {
    return PageComponent.addModifier(this.modifierTop);
  }

  get modCenter(): string[] {
    return PageComponent.addModifier(this.modifierCenter);
  }

  get modBottom(): string[] {
    return PageComponent.addModifier(this.modifierBottom);
  }

  static addModifier(modifier: string[]) {
    return modifier.map(m => `page--${m}`);
  }
}
