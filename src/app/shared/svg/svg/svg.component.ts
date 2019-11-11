import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {
  idName: string;
  sizeModifier = 'app-svg--medium';

  @Input() set size(val: string) {
    this.sizeModifier = `app-svg--${val}`;
  }

  @Input() set name(val: string) {
    this.idName = `symbol-icon-${val}`;
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.elRef.nativeElement, this.sizeModifier);
  }

  get absUrl(): string {
    return window.location.href;
  }
}
