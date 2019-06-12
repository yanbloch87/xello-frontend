import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  buttonATooltip: string;
  buttonBTooltip: string;

  ngOnInit(): void {
    this.buttonATooltip = 'Hello, I\'m button a\'s tooltip text';
    this.buttonBTooltip = 'Hi there, I\'m button b\'s tooltip text';
  }
}
