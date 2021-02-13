import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ButtonComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.size = 'large';
    component.modifier = ['1', '2'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 css-classes attached', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.classList.length).toEqual(4);
  });

  it('should have button class', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.classList).toContain('button');
  });

  it('should have button--1 class', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.classList).toContain('button--1');
  });

  it('should have button--2 class', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.classList).toContain('button--2');
  });

  it('should have button--large class', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.classList).toContain('button--large');
  });
});
