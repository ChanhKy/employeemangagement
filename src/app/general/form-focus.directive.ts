import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: '[focusInvalidInput]'
})

export class FormFocusDirective {
  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onFormSubmit() {
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');

    if(invalidControl) {
      invalidControl.focus();
      // focus tại input bị lỗi và đổi màu border
      // invalidControl.style.border = '1px solid red';
    }
  }
}
