import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {NotesService} from '../../services/notes.service';
import {Note} from '../../models/note.model';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy {

  editTile: boolean;
  title: FormControl;

  editBody: boolean;
  body: FormControl;

  notes: Note[];

  getAllNotesSubscription: Subscription;
  updateNoteSubscription: Subscription;
  deleteNoteSubscription: Subscription;
  addNoteSubscription: Subscription;
  newNoteSubscription: Subscription;

  constructor(public sharedService: SharedService,
              public notesService: NotesService) {
  }

  ngOnInit() {
    this.getAllNotes();
    this.title = new FormControl('');
    this.body = new FormControl('');
    this.addNoteSubscription = this.notesService.noteAdded.subscribe(() => {
      this.getAllNotes();
    });
  }

  ngOnDestroy() {
    this.getAllNotesSubscription.unsubscribe();
    this.addNoteSubscription.unsubscribe();
    if (this.updateNoteSubscription) {
      this.updateNoteSubscription.unsubscribe();
    }

    if (this.deleteNoteSubscription) {
      this.deleteNoteSubscription.unsubscribe();
    }

    if (this.newNoteSubscription) {
      this.newNoteSubscription.unsubscribe();
    }
  }

  getAllNotes() {
    this.getAllNotesSubscription = this.notesService.getAllNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  addNewNote() {
    const note = new Note({
      title: 'New Note',
      body: 'Click here to edit...'
    });
    this.newNoteSubscription = this.notesService.addNote(note).subscribe(newNote => {
      this.notesService.noteAddedSrc.next(true);
      this.notesService.selectedNoteSrc.next(newNote);
    });
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
    this.updateNoteSubscription = this.notesService.updateNote(note._id, note).subscribe(updatedNote => {
    });
    this.editTile = false;
    this.editBody = false;
  }

  deleteNote(id: string) {
    this.deleteNoteSubscription = this.notesService.deleteNote(id).subscribe((s) => {
      console.log(s);
      this.getAllNotes();
      this.notesService.selectedNoteSrc.next(null);
    });
  }

}
