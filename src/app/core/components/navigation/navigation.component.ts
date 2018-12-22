import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from '../../../users/services/auth.service';
import {SharedService} from '../../../shared/services/shared.service';
import {BookmarkService} from '../../../bookmarks/services/bookmark.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {TasksService} from '../../../todo/services/tasks.service';
import {Task} from '../../../todo/models/task.model';
import {NotesService} from '../../../notes/services/notes.service';
import {Note} from '../../../notes/models/note.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @ViewChild('bookmarkForm') bookmarkForm: TemplateRef<HTMLElement>;
  @ViewChild('taskForm') taskForm: TemplateRef<HTMLElement>;
  bookmarkDialogRef: MatDialogRef<any>;
  tasksModalRef: MatDialogRef<any>;
  currentDate: Date;
  currentWeather: string;
  app: string;

  constructor(public authService: AuthService,
              public sharedService: SharedService,
              private bookmarkService: BookmarkService,
              private notesService: NotesService,
              private matDialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.currentWeather = 'Clear, 32 degrees.';
  }

  changeCurrentApp(app) {
    this.sharedService.currentApp = app;
    this.app = this.sharedService.currentApp;
  }

  openBookmarkModal() {
    this.bookmarkDialogRef = this.matDialog.open(this.bookmarkForm, {
      width: '25rem'
    });
  }

  openTasksModal() {
    this.tasksModalRef = this.matDialog.open(this.taskForm, {
      width: '25rem'
    });
  }

  addNewNote() {
    const note = new Note({
      title: 'New Note',
      body: 'Click here to edit...'
    });
    this.notesService.addNote(note)
  }

  openSettings() {
    this.sharedService.isSettings = !this.sharedService.isSettings;
    this.router.navigateByUrl('/settings');
  }

}
