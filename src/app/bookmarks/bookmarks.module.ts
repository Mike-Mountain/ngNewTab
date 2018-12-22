import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksListComponent } from './components/bookmarks-list/bookmarks-list.component';
import {MaterialModule} from '../material/material.module';
import {SharedModule} from '../shared/shared.module';
import { NewBookmarkComponent } from './components/new-bookmark/new-bookmark.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    BookmarksListComponent,
    NewBookmarkComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    BookmarksListComponent,
    NewBookmarkComponent
  ]
})
export class BookmarksModule { }
