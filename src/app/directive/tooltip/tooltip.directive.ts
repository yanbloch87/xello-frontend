import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

const TIP_SIZE = 10;

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit {
  @Input() tooltip: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this._subscribeElClick();
  }

  private _subscribeElClick() {
    this.el.nativeElement.addEventListener('click', () => this._onClick(), {once: true});
  }

  private _onClick() {
    const tooltipEl: HTMLDivElement = this.renderer.createElement('div');
    this._subscribeWindowClick(tooltipEl);
    this._subscribeWindowScroll(tooltipEl);
    this._subscribeWindowResize(tooltipEl);
    this._drawTooltipEl(tooltipEl);
    document.body.appendChild(tooltipEl);
  }

  private _drawTooltipEl(tooltipEl: HTMLDivElement) {
    tooltipEl.innerHTML = this.tooltip;
    tooltipEl.className = 'xello-tooltip p-2';
    this.renderer.setStyle(tooltipEl, 'top', `${this.el.nativeElement.offsetTop}px`);
    this.renderer.setStyle(tooltipEl, 'left', `0px`);
    const cancelRequestAnimationFrame = requestAnimationFrame(() => {
      cancelAnimationFrame(cancelRequestAnimationFrame);
      const {y}: DOMRect = tooltipEl.getBoundingClientRect() as DOMRect;
      let top = this.el.nativeElement.offsetTop - tooltipEl.offsetHeight - TIP_SIZE;
      let className = 'top';
      if (y <= (tooltipEl.offsetHeight + TIP_SIZE)) {
        top = this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight + TIP_SIZE;
        className = 'bottom';
      }
      this.renderer.setStyle(tooltipEl, 'top', `${top}px`);
      this.renderer.addClass(tooltipEl, className);
      const left = this.el.nativeElement.offsetLeft + (this.el.nativeElement.offsetWidth - tooltipEl.offsetWidth) / 2;
      this.renderer.setStyle(tooltipEl, 'left', `${left}px`);
    });
  }

  private _subscribeWindowClick(tooltipEl: HTMLDivElement) {
    const clearTooltip = () => {
      document.body.removeChild(tooltipEl);
      window.removeEventListener('click', onWindowClick);
      window.removeEventListener('keydown', onWindowKeydown);
      this._subscribeElClick();
    };

    const onWindowClick = (event: MouseEvent) => {
      if (![this.el.nativeElement, tooltipEl].includes(event.target)) {
        clearTooltip();
      }
    };

    const onWindowKeydown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        clearTooltip();
      }
    };

    window.addEventListener('click', onWindowClick);
    window.addEventListener('keydown', onWindowKeydown);
  }

  private _subscribeWindowScroll(tooltipEl: HTMLDivElement) {
    const onWindowScroll = () => {
      const {y}: DOMRect = tooltipEl.getBoundingClientRect() as DOMRect;
      if (y <= 0 && !tooltipEl.className.includes('bottom')) {
        window.removeEventListener('scroll', onWindowScroll);
        this.renderer.addClass(tooltipEl, 'bottom');
        this.renderer.removeClass(tooltipEl, 'top');
        const top = this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight + TIP_SIZE;
        this.renderer.setStyle(tooltipEl, 'top', `${top}px`);
      }
    };
    window.addEventListener('scroll', onWindowScroll);
  }

  private _subscribeWindowResize(tooltipEl: HTMLDivElement) {
    const onWindowResize = () => this._drawTooltipEl(tooltipEl);
    window.addEventListener('resize', onWindowResize);
  }

}
