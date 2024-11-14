import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {

  @Input('appTooltip') tooltipTitle: string | null = '';  
  @Input() placement: string = 'bottom';  // Default to 'bottom'
  @Input() delay: number = 300; 
  tooltip?: HTMLElement;
  offset = 10;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  show() {
    this.create();
    this.setPosition();
    this.tooltip?.classList.add('ui-tooltip-show');
  }

  hide() {
    this.tooltip?.classList.remove('ui-tooltip-show'); 
    this.tooltip?.remove();
    this.tooltip = undefined;
  }

  create() {
    this.tooltip = document.createElement('span');
    this.tooltip.classList.add('ui-tooltip', this.placement);  // Add placement class
    this.tooltip.textContent = this.tooltipTitle;
    document.body.appendChild(this.tooltip);
  }

  setPosition() {
    const elemRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltip?.getBoundingClientRect();
    if (!tooltipRect) return;

    let left = elemRect.left + elemRect.width / 2;  
    let top = 0;

    switch (this.placement) {
      case 'top':
        top = elemRect.top - tooltipRect.height - this.offset;
        this.tooltip?.classList.add('top');
        break;

      case 'bottom':
        top = elemRect.bottom + this.offset;
        this.tooltip?.classList.add('bottom');
        break;

      case 'left':
        left = elemRect.left - tooltipRect.width - this.offset;
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        this.tooltip?.classList.add('left');
        break;

      case 'right':
        left = elemRect.right + this.offset;
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        this.tooltip?.classList.add('right');
        break;

      default:
        top = elemRect.bottom + this.offset;  
        this.tooltip?.classList.add('bottom');
        break;
    }

    if (this.tooltip) {
      this.tooltip.style.top = `${top}px`;
      this.tooltip.style.left = `${left}px`;
    }
  }
}
