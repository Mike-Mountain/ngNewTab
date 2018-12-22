import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import {BookmarksModule} from '../bookmarks/bookmarks.module';
import {TodoModule} from '../todo/todo.module';
import {NotesModule} from '../notes/notes.module';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    BookmarksModule,
    TodoModule,
    NotesModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule { }
