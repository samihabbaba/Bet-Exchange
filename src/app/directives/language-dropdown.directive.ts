import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appLanguageDropdown]',
})
export class LanguageDropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  arrow: any = null;

  ngOnInit() {
    this.getArrow();
  }
  getArrow() {
    for (let child of this.elRef.nativeElement.childNodes) {
      if (child.className == 'language-dropdown-arrow') {
        this.arrow = child;
      }
    }
  }

  @HostListener('click') click() {
    if (this.elRef.nativeElement.classList.contains('active')) {
      this.elRef.nativeElement.classList.remove('active');
      this.arrow.classList.remove('active');
    } else {
      this.elRef.nativeElement.classList.add('active');
      this.arrow.classList.add('active');
      console.log(this.arrow)
    }
  }

  @HostListener('document: click', ['$event']) clickOutOfButton(event: any) {
    if (
      !this.elRef.nativeElement.contains(event.target) &&
      this.elRef.nativeElement.classList.contains('active')
    ) {
      this.elRef.nativeElement.classList.remove('active');
      this.arrow.classList.remove('active');
    }
  }
}
