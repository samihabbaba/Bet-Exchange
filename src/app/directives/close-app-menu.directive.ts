import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appCloseAppMenu]',
})
export class CloseAppMenuDirective {
  @Input('menu') displayMenu?: any;
  @Output() closeMenu: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('document: click', ['$event']) clickOutOfMenu(event: any) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.closeMenu.emit();
    }
  }
}
