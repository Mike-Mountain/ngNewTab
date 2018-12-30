import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
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

  notes: Note[];

  getAllNotesSubscription: Subscription;
  addNoteSubscription: Subscription;
  newNoteSubscription: Subscription;

  isNewNote = false;

  constructor(public sharedService: SharedService,
              public notesService: NotesService) {
  }

  ngOnInit() {
    this.getAllNotes();
    this.addNoteSubscription = this.notesService.noteAdded.subscribe(() => {
      this.getAllNotes();
    });
  }

  ngOnDestroy() {
    this.getAllNotesSubscription.unsubscribe();
    this.addNoteSubscription.unsubscribe();

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
    const note = new Note({});
    this.isNewNote = true;
    this.newNoteSubscription = this.notesService.addNote(note).subscribe(newNote => {
      this.notesService.noteAddedSrc.next(true);
      this.notesService.isEditableSrc.next(true);
      this.notesService.selectedNoteSrc.next(newNote);
    });
  }

  selectNote(note: Note) {
    this.notesService.selectedNoteSrc.next(note);
  }

  updateNoteStatus() {
    this.getAllNotes();
    this.isNewNote = false;
    this.notesService.isEditableSrc.next(false);
  }

  deleteAll() {
    this.notes.forEach(note => {
      this.notesService.deleteNote(note._id).subscribe(cb => {
        console.log(`${cb} deleted`);
        this.getAllNotes();
      });
    });
  }

}
