import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';
import {BookmarksModule} from '../bookmarks/bookmarks.module';
import {TodoModule} from '../todo/todo.module';
import {NotesModule} from '../notes/notes.module';
import {SearchModule} from '../search/search.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    NavigationComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    BookmarksModule,
    TodoModule,
    NotesModule,
    SearchModule
  ],
  exports: [
    NavigationComponent,
    HeaderComponent
  ]
})
export class CoreModule {
}
