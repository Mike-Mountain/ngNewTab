import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {FirebaseModule} from './firebase/firebase.module';
import {SharedModule} from './shared/shared.module';
import {BookmarksModule} from './bookmarks/bookmarks.module';
import {NotesModule} from './notes/notes.module';
import {TodoModule} from './todo/todo.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AngularMarkdownEditorModule} from 'angular-markdown-editor';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularMarkdownEditorModule.forRoot({ iconlibrary: 'fa' }),
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    FirebaseModule,
    CoreModule,
    BookmarksModule,
    SharedModule,
    NotesModule,
    TodoModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
