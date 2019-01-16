import {ApplicationRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {NotesService} from '../../services/notes.service';
import {Note} from '../../models/note.model';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../users/services/auth.service';
import {User} from '../../../users/models/user.model';
import {Folder} from '../../../shared/models/folder.model';
import {FolderService} from '../../../shared/services/folder.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy {

  notes: Note[];
  selectedNote: Note;
  folders: Folder[];
  currentFolder: Folder;

  getNotesFoldersSubscription: Subscription;
  getAllNotesSubscription: Subscription;
  addNoteSubscription: Subscription;
  newNoteSubscription: Subscription;
  selectedNoteSubscription: Subscription;
  userSubscription: Subscription;
  deleteFolderSubscription: Subscription;

  user: User;

  isNewNote = false;

  constructor(public sharedService: SharedService,
              public notesService: NotesService,
              public authService: AuthService,
              private folderService: FolderService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.fireBaseUser.subscribe(user => {
      this.user = user;
      this.getNotesFoldersSubscription = this.notesService.getNotesFolders(user._id, 'Notes').subscribe(folders => {
        this.folders = folders;
        this.currentFolder = folders[0];
        this.getAllNotesSubscription = this.notesService.findNotesByFolder(user._id, this.currentFolder.name).subscribe(notes => {
          this.notes = notes;
          this.addNoteSubscription = this.notesService.noteAdded.subscribe(() => {
            this.rePopulateNotesList(this.currentFolder.name);
          });
        });
      });
    });

    this.selectedNoteSubscription = this.notesService.selectedNoteFromService.subscribe(note => {
      this.selectedNote = note;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.getNotesFoldersSubscription.unsubscribe();
    this.getAllNotesSubscription.unsubscribe();
    this.addNoteSubscription.unsubscribe();

    if (this.newNoteSubscription) {
      this.newNoteSubscription.unsubscribe();
    }
    if (this.selectedNoteSubscription) {
      this.selectedNoteSubscription.unsubscribe();
    }
  }

  rePopulateNotesList(folderName: string, folder?: Folder) {
    const name: string = folderName || folder.name;
    this.getNotesFolders(this.user._id, 'Notes');
    this.getAllNotes(this.user._id, name);
  }

  getNotesFolders(userId: string, folderFor: string) {
    this.getNotesFoldersSubscription = this.notesService.getNotesFolders(userId, folderFor).subscribe(folders => {
      this.folders = folders;
    });
  }

  getAllNotes(userId: string, folderName: string, folder?: Folder) {
    this.getAllNotesSubscription = this.notesService.findNotesByFolder(userId, folderName).subscribe(notes => {
      this.notes = notes;
      if (folder) {
        this.currentFolder = folder;
      } else {
        this.currentFolder = this.folders[0];
      }
    });
  }

  addNewNote() {
    const note = new Note({userId: this.user._id, folder: this.currentFolder.name});
    this.isNewNote = true;

    this.newNoteSubscription = this.notesService.addNote(note).subscribe(newNote => {
      this.notesService.noteAddedSrc.next(true);
      this.notesService.isEditableSrc.next(true);
      this.notesService.selectedNoteSrc.next(newNote);
    });
  }

  openNewFolderModal() {
    this.folderService.openNewNoteFolderModal();
  }

  selectNote(note: Note) {
    this.notesService.selectNote(note);
  }

  updateNoteStatus() {
    this.rePopulateNotesList(this.currentFolder.name);
    this.isNewNote = false;
    this.notesService.isEditableSrc.next(false);
  }

  deleteSelectedFolder(folderId: string, userId: string) {
    this.deleteFolderSubscription = this.folderService.deleteFolder(folderId, userId).subscribe(() => {
      const folderName = this.folders[0].name;
      this.rePopulateNotesList(folderName);
    });
  }

  deleteAll() {
    this.notes.forEach(note => {
      this.notesService.deleteNote(note._id, note.userId).subscribe(message => {
        console.log(`${message} deleted`);
        this.rePopulateNotesList(this.currentFolder.name);
      });
    });
  }

}
