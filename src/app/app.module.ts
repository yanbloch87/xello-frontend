import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipDirective } from './directive/tooltip/tooltip.directive';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import { AccessibilityComponent } from './accessibility/accessibility.component';

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    AccessibilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule { }
