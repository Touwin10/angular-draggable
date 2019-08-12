import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {

  canDrag: boolean;

  currentX: number;
  currentY: number;

  initialX: number
  initialY: number;

  xOffset = 0;
  yOffset = 0;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.cursor = "grab";
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  public dragStart(e) {
    if (e.type === "touchstart") {
      this.initialX = e.touches[0].clientX - this.xOffset;
      this.initialY = e.touches[0].clientY - this.yOffset;
    } else {
      this.initialX = e.clientX - this.xOffset;
      this.initialY = e.clientY - this.yOffset;
    }

    if (e.target === this.el.nativeElement) {
      this.canDrag = true;
      this.el.nativeElement.style.cursor = "grabbing";
    }
  }


  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  public dragEnd(e) {
    this.initialX = this.currentX;
    this.initialY = this.currentY;
    this.canDrag = false;
    this.el.nativeElement.style.cursor = "grab";
  }


  @HostListener('touchmove', ['$event'])
  @HostListener('mousemove', ['$event'])
  public drag(e) {
    if (this.canDrag) {
      e.preventDefault();

      if (e.type === "touchmove") {
        this.currentX = e.touches[0].clientX - this.initialX;
        this.currentY = e.touches[0].clientY - this.initialY;
      } else {
        this.currentX = e.clientX - this.initialX;
        this.currentY = e.clientY - this.initialY;
      }

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;
      this.el.nativeElement.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;

    }
  }

}
