import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {NotesService} from '../../services/notes.service';
import {Note} from '../../models/note.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {

  editTile: boolean;
  title: FormControl;

  editBody: boolean;
  body: FormControl;

  constructor(public sharedService: SharedService,
              public notesService: NotesService) {
  }

  ngOnInit() {
    this.notesService.getNotes();
    this.title = new FormControl('New Note');
    this.body = new FormControl('');
  }

  selectNote(note: Note) {
    this.notesService.selectedNoteSrc.next(note);
  }

  updateNote(note: Note, title?: string, body?: string) {
    if (title) {
      note.title = title;
    }
    if (body) {
      note.body = body;
    }
    this.notesService.updateNote(note);
    this.editTile = false;
    this.editBody = false;
  }

  deleteNote(id: string) {
    this.notesService.deleteNote(id);
    this.notesService.selectedNoteSrc.next(null);
  }

}
