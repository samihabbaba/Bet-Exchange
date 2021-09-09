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
  selector: '[appCloseBetSlip]',
})
export class CloseBetSlipDirective {
  @Input() displayBetSlip?: any;
  @Output() closeBetSlip: EventEmitter<any> = new EventEmitter();

  overlayPanel: any = document.querySelector('.cdk-overlay-container');

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('document: click', ['$event']) clickOutOfMenu(event: any) {
    if (
      !this.elRef.nativeElement.contains(event.target) &&
      this.displayBetSlip &&
      !event.target.classList.contains('mat-option') &&
      !event.target.classList.contains('mat-option-text')
    ) {
      this.closeBetSlip.emit();
    }
  }
}
