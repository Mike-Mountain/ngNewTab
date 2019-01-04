import {ApplicationRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {NotesService} from '../../services/notes.service';
import {Note} from '../../models/note.model';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../users/services/auth.service';
import {User} from '../../../users/models/user.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy {

  notes: Note[];
  selectedNote: Note;

  getAllNotesSubscription: Subscription;
  addNoteSubscription: Subscription;
  newNoteSubscription: Subscription;
  selectedNoteSubscription: Subscription;
  userSubscription: Subscription;

  user: User;

  isNewNote = false;

  constructor(public sharedService: SharedService,
              public notesService: NotesService,
              public authService: AuthService,
              private ar: ApplicationRef) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.fireBaseUser.subscribe(user => {
      this.user = user;
      this.getAllNotes(this.user && this.user._id);
    });

    this.addNoteSubscription = this.notesService.noteAdded.subscribe(() => {
      this.getAllNotes(this.user && this.user._id);
    });

    this.selectedNoteSubscription = this.notesService.selectedNoteFromService.subscribe(note => {
      this.selectedNote = note;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.getAllNotesSubscription.unsubscribe();
    this.addNoteSubscription.unsubscribe();

    if (this.newNoteSubscription) {
      this.newNoteSubscription.unsubscribe();
    }
    if (this.selectedNoteSubscription) {
      this.selectedNoteSubscription.unsubscribe();
    }
  }

  getAllNotes(userId: string) {
    this.getAllNotesSubscription = this.notesService.findNotesByUser(userId).subscribe(notes => {
      this.notes = notes;
    });
  }

  addNewNote() {
    const note = new Note({userId: this.user._id});
    this.isNewNote = true;

    this.newNoteSubscription = this.notesService.addNote(note).subscribe(newNote => {
      this.notesService.noteAddedSrc.next(true);
      this.notesService.isEditableSrc.next(true);
      this.notesService.selectedNoteSrc.next(newNote);
    });
  }

  selectNote(note: Note) {
    this.notesService.selectNote(note);
  }

  updateNoteStatus() {
    this.getAllNotes(this.user && this.user._id);
    this.isNewNote = false;
    this.notesService.isEditableSrc.next(false);
  }

  deleteAll() {
    this.notes.forEach(note => {
      this.notesService.deleteNote(note._id, note.userId).subscribe(message => {
        console.log(`${message} deleted`);
        this.getAllNotes(this.user && this.user._id);
      });
    });
  }

}
