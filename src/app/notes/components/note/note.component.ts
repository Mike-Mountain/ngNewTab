import {ApplicationRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef} from '@angular/core';
import {Note} from '../../models/note.model';
import {EditorOption} from 'angular-markdown-editor';
import {MarkdownService} from 'ngx-markdown';
import {Subscription} from 'rxjs';
import {NotesService} from '../../services/notes.service';
import {mdExtraButtons} from '../../constants/constants';

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

  selectedNote: Note;
  options: EditorOption;

  selectedNoteSubscription: Subscription;
  updateNoteSubscription: Subscription;
  deleteNoteSubscription: Subscription;

  constructor(private markdownService: MarkdownService,
              public notesService: NotesService) {
  }

  ngOnInit() {
    this.selectedNoteSubscription = this.notesService.selectedNoteFromService.subscribe(note => {
      this.selectedNote = note;
    });
    this.options = {
      parser: (val) => this.markdownService.compile(val.trim()),
      additionalButtons: mdExtraButtons
    };
  }

  ngOnDestroy() {
    if (this.selectedNoteSubscription) {
      this.selectedNoteSubscription.unsubscribe();
    }

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
    this.deleteNoteSubscription = this.notesService.deleteNote(id, this.selectedNote.userId).subscribe((s) => {
      console.log(s);
      this.deleted.emit();
      this.notesService.isEditableSrc.next(false);
      this.notesService.selectedNoteSrc.next(null);
    });
  }

  log(m) {
    console.log(m);
  }

}
