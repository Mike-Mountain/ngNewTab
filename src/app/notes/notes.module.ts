import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMarkdownEditorModule} from 'angular-markdown-editor';
import {MarkdownModule} from 'ngx-markdown';
import { NoteComponent } from './components/note/note.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    NotesListComponent,
    NoteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMarkdownEditorModule,
    MarkdownModule.forChild(),
    SharedModule
  ],
  exports: [
    NotesListComponent
  ]
})
export class NotesModule { }
