import {AfterViewInit, Component, Renderer2} from '@angular/core';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements AfterViewInit {

  fontSize: number;

  constructor(private renderer: Renderer2) {
    this.fontSize = 0;
  }

  ngAfterViewInit(): void {
    this.renderer.addClass(document.body, `zoom-${this.fontSize}`);
  }

  onPlusClick() {
    this.renderer.removeClass(document.body, `zoom-${this.fontSize}`);
    this.fontSize = Math.min(5, ++this.fontSize);
    this.renderer.addClass(document.body, `zoom-${this.fontSize}`);
  }

  onMinusClick() {
    this.renderer.removeClass(document.body, `zoom-${this.fontSize}`);
    this.fontSize = Math.max(0, --this.fontSize);
    this.renderer.addClass(document.body, `zoom-${this.fontSize}`);
  }
}
