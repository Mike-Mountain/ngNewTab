import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Note} from '../../models/note.model';
import {EditorOption} from 'angular-markdown-editor';
import {MarkdownService} from 'ngx-markdown';
import {Subscription} from 'rxjs';
import {NotesService} from '../../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {

  @Input() note: Note;
  @Input() editable: boolean;
  @Input() isNewNote: boolean;
  @Output() deleted = new EventEmitter();
  @Output() updated = new EventEmitter();
  options: EditorOption;
  updateNoteSubscription: Subscription;
  deleteNoteSubscription: Subscription;

  constructor(private markdownService: MarkdownService,
              public notesService: NotesService) {
  }

  ngOnInit() {
    console.log(this.editable);
    this.options = {
      parser: (val) => this.markdownService.compile(val.trim()),
      additionalButtons: [
        [{
          name: 'groupFont',
          data: [{
            name: 'cmdStrikethrough',
            toggle: false,
            title: 'Strikethrough',
            icon: {
              fa: 'fa fa-strikethrough',
              glyph: 'glyphicon glyphicon-minus'
            },
            callback: (e) => {
              // Give/remove ~~ surround the selection
              let chunk;
              let cursor;
              const selected = e.getSelection();
              const content = e.getContent();

              if (selected.length === 0) {
                // Give extra word
                chunk = e.__localize('strikethrough');
              } else {
                chunk = selected.text;
              }

              // transform selection and set the cursor into chunked text
              if (content.substr(selected.start - 2, 2) === '~~' &&
                content.substr(selected.end, 2) === '~~') {
                e.setSelection(selected.start - 2, selected.end + 2);
                e.replaceSelection(chunk);
                cursor = selected.start - 2;
              } else {
                e.replaceSelection('~~' + chunk + '~~');
                cursor = selected.start + 2;
              }

              // Set the cursor
              e.setSelection(cursor, cursor + chunk.length);
            }
          }]
        },
          {
            name: 'groupMisc',
            data: [{
              name: 'cmdTable',
              toggle: false,
              title: 'Table',
              icon: {
                fa: 'fa fa-table',
                glyph: 'glyphicon glyphicon-th'
              },
              callback: (e) => {
                // Replace selection with some drinks
                let chunk;
                let cursor;
                const selected = e.getSelection();

                chunk = '\n| Tables        | Are           | Cool  | \n'
                  + '| ------------- |:-------------:| -----:| \n'
                  + '| col 3 is      | right-aligned | $1600 | \n'
                  + '| col 2 is      | centered      |   $12 | \n'
                  + '| zebra stripes | are neat      |    $1 |';

                // transform selection and set the cursor into chunked text
                e.replaceSelection(chunk);
                cursor = selected.start;

                // Set the cursor
                e.setSelection(cursor, cursor + chunk.length);
              }
            }]
          }]
      ]
    };
  }

  ngOnDestroy() {
    if (this.updateNoteSubscription) {
      this.updateNoteSubscription.unsubscribe();
    }

    if (this.deleteNoteSubscription) {
      this.deleteNoteSubscription.unsubscribe();
    }
  }

  updateNote(note: Note, title?: string, body?: string) {
    if (title) {
      note.title = title;
    }
    if (body) {
      note.body = body;
    }
    this.updateNoteSubscription = this.notesService.updateNote(note._id, note).subscribe(() => {
      this.updated.emit();
      this.editable = false;
      this.isNewNote = false;
    });
  }

  deleteNote(id: string) {
    this.deleteNoteSubscription = this.notesService.deleteNote(id).subscribe((s) => {
      console.log(s);
      this.deleted.emit();
      this.notesService.isEditableSrc.next(false);
      this.notesService.selectedNoteSrc.next(null);
    });
  }

}
