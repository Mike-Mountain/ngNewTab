import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BookmarkService} from '../../services/bookmark.service';
import {Bookmark} from '../../models/bookmark.model';
import {SharedService} from '../../../shared/services/shared.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';

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
  bookmarkDialogRef: MatDialogRef<any>;

  constructor(public bookmarkService: BookmarkService,
              public sharedService: SharedService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.openNewBookmarkModalSubscription = this.bookmarkService.newBookmarkModal.subscribe(isOpen => {
      if (isOpen) {
        this.bookmarkDialogRef = this.matDialog.open(this.bookmarkForm, {
          width: '25rem'
        });
      }
    });
    this.getBookmarks();
  }

  ngOnDestroy() {
    this.getBookmarksSubscription.unsubscribe();
    if (this.deleteBookmarkSubscription) {
      this.deleteBookmarkSubscription.unsubscribe();
    }
  }

  getBookmarks() {
    this.getBookmarksSubscription = this.bookmarkService.getBookmarks().subscribe(bookmarks => {
      this.bookmarks = bookmarks;
    });
  }

  openBookmarkModal() {
    this.bookmarkService.newBookmarkModalSrc.next(true);
  }

  deleteBookmark(id: string) {
    this.deleteBookmarkSubscription = this.bookmarkService.deleteBookmark(id).subscribe((s) => {
      console.log(s);
      this.getBookmarks();
    });
  }

}
