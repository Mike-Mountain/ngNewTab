import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from '../../../users/services/auth.service';
import {SharedService} from '../../../shared/services/shared.service';
import {BookmarkService} from '../../../bookmarks/services/bookmark.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {TasksService} from '../../../todo/services/tasks.service';
import {Task} from '../../../todo/models/task.model';
import {NotesService} from '../../../notes/services/notes.service';
import {Note} from '../../../notes/models/note.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @ViewChild('bookmarkForm') bookmarkForm: TemplateRef<HTMLElement>;
  @ViewChild('taskForm') taskForm: TemplateRef<HTMLElement>;
  bookmarkDialogRef: MatDialogRef<any>;
  currentDate: Date;
  currentWeather: string;
  app: string;
  search: boolean;

  constructor(public authService: AuthService,
              public sharedService: SharedService,
              public tasksService: TasksService,
              private bookmarkService: BookmarkService,
              private notesService: NotesService,
              private matDialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.currentWeather = 'Clear, 32 degrees.';
  }

  closeSearch(event) {
    this.search = event !== 'closed';
  }

  changeCurrentApp(app) {
    this.sharedService.currentApp = app;
    this.app = this.sharedService.currentApp;
  }

  openSettings() {
    this.sharedService.isSettings = !this.sharedService.isSettings;
    this.router.navigateByUrl('/settings');
  }

  openUsers() {
    this.sharedService.isSettings = !this.sharedService.isSettings;
    this.router.navigateByUrl('/user/users');
  }

}
