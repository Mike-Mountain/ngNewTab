import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BookmarkService} from '../../services/bookmark.service';
import {Bookmark} from '../../models/bookmark.model';
import {SharedService} from '../../../shared/services/shared.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AuthService} from '../../../users/services/auth.service';
import {User} from '../../../users/models/user.model';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit, OnDestroy {

  @ViewChild('bookmarkForm') bookmarkForm: TemplateRef<HTMLElement>;

  bookmarks: Bookmark[];
  getBookmarksSubscription: Subscription;
  deleteBookmarkSubscription: Subscription;
  openNewBookmarkModalSubscription: Subscription;
  userSubscription: Subscription;

  user: User;

  bookmarkDialogRef: MatDialogRef<any>;

  constructor(public bookmarkService: BookmarkService,
              public sharedService: SharedService,
              public authService: AuthService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.fireBaseUser.subscribe((user: User) => {
      this.user = user;
      this.getBookmarks(user._id);
    });
    this.openNewBookmarkModalSubscription = this.bookmarkService.newBookmarkModal.subscribe(isOpen => {
      if (isOpen) {
        this.bookmarkDialogRef = this.matDialog.open(this.bookmarkForm, {
          width: '25rem'
        });
      }
    });
  }

  ngOnDestroy() {
    this.getBookmarksSubscription.unsubscribe();
    if (this.deleteBookmarkSubscription) {
      this.deleteBookmarkSubscription.unsubscribe();
    }
  }

  getBookmarks(userId: string) {
    this.getBookmarksSubscription = this.bookmarkService.findBookmarksByUser(userId).subscribe(bookmarks => {
      console.log(bookmarks);
      this.bookmarks = bookmarks;
    });
  }

  openBookmarkModal() {
    this.bookmarkService.newBookmarkModalSrc.next(true);
  }

  deleteBookmark(id: string) {
    this.deleteBookmarkSubscription = this.bookmarkService.deleteBookmark(id).subscribe((s) => {
      console.log(s);
      this.getBookmarks(this.user._id);
    });
  }

}
