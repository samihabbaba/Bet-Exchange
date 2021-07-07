import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollShadow]',
})
export class ScrollShadowDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') addBottomShadow() {
    if (this.isOverflown()) {
      this.elRef.nativeElement.classList.add('scrollShadow');
    }
  }

  @HostListener('mouseout') removeBottomShadow() {
    if (this.elRef.nativeElement.classList.contains('scrollShadow')) {
      this.elRef.nativeElement.classList.remove('scrollShadow');
    }
  }

  isOverflown() {
    return (
      this.elRef.nativeElement.scrollHeight >
      this.elRef.nativeElement.clientHeight
    );
  }
}
