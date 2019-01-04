import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {MaterialModule} from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchModule { }
