import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit {
  @Input() tooltip: string;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.addEventListener('click', () => this._onClick(), {once: true});
  }

  private _onClick() {
    const tooltipEl = document.createElement('div');
    const onWindowClick = event => {
      if (event.target !== this.el.nativeElement) {
        this.el.nativeElement.removeChild(tooltipEl);
        window.removeEventListener('click', onWindowClick);
      }
    };
    window.addEventListener('click', onWindowClick);
    tooltipEl.innerHTML = this.tooltip;
    tooltipEl.className = 'xello-tooltip';
    setTimeout(() => {
      const top = this.el.nativeElement.offsetTop - tooltipEl.offsetHeight;
      tooltipEl.style.top = `${top}px`;
      const left = this.el.nativeElement.offsetLeft + (this.el.nativeElement.offsetWidth - tooltipEl.offsetWidth) / 2;
      tooltipEl.style.left = `${left}px`;
    });
    this.el.nativeElement.appendChild(tooltipEl);
  }

  private _onWindowClick(event, tooltipEl) {

  }

}
