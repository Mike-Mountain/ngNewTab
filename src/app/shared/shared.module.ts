import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NewFolderComponent } from './components/new-folder/new-folder.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';

@NgModule({
  declarations: [
    SpinnerComponent,
    MessagesComponent,
    NewFolderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent,
    MessagesComponent,
    NewFolderComponent,
  ]
})
export class SharedModule { }
