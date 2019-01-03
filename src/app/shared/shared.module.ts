import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    MessagesComponent,
  ]
})
export class SharedModule { }
