import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BookmarkService} from '../../services/bookmark.service';
import {Bookmark} from '../../models/bookmark.model';
import {SharedService} from '../../../shared/services/shared.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AuthService} from '../../../users/services/auth.service';
import {User} from '../../../users/models/user.model';
import {Folder} from '../../../shared/models/folder.model';
import {FolderService} from '../../../shared/services/folder.service';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit, OnDestroy {

  @ViewChild('bookmarkForm') bookmarkForm: TemplateRef<HTMLElement>;

  user: User;

  getBookmarksFoldersSubscription: Subscription;
  getBookmarksSubscription: Subscription;
  deleteBookmarkSubscription: Subscription;
  deleteFolderSubscription: Subscription;
  openNewBookmarkModalSubscription: Subscription;
  addNewFolderSubscription: Subscription;
  userSubscription: Subscription;

  bookmarks: Bookmark[];
  folders: Folder[];
  currentFolder: Folder;
  bookmarkDialogRef: MatDialogRef<any>;

  constructor(public bookmarkService: BookmarkService,
              public sharedService: SharedService,
              public authService: AuthService,
              public folderService: FolderService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.fireBaseUser.subscribe((user: User) => {
      this.user = user;
      this.getBookmarksFoldersSubscription = this.bookmarkService.getBookmarksFolders(user._id, 'Bookmarks').subscribe(
        folders => {
          this.folders = folders;
          this.currentFolder = this.folders[0];
          this.getBookmarksSubscription = this.bookmarkService.findBookmarksByType(user._id, this.currentFolder.name)
            .subscribe(bookmarks => {
              this.bookmarks = bookmarks;
            });
        }
      );
      this.getBookmarks(user._id, 'Personal');
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
    this.userSubscription.unsubscribe();
    this.getBookmarksFoldersSubscription.unsubscribe();
    if (this.getBookmarksSubscription) {
      this.getBookmarksSubscription.unsubscribe();
    }
    if (this.deleteBookmarkSubscription) {
      this.deleteBookmarkSubscription.unsubscribe();
    }
  }

  getBookmarkFolders(userId: string, folderFor: string) {
    this.getBookmarksFoldersSubscription = this.bookmarkService.getBookmarksFolders(userId, folderFor).subscribe(
      folders => {
        this.folders = folders;
        this.currentFolder = this.folders[0];
      }
    );
  }

  getBookmarks(userId: string, folderName: string, folder?: Folder) {
    this.getBookmarksSubscription = this.bookmarkService.findBookmarksByType(userId, folderName).subscribe(bookmarks => {
      this.bookmarks = bookmarks;
      if (folder) {
        this.currentFolder = folder;
      }
    });
  }

  openNewFolderModal() {
    this.folderService.openNewBookmarkFolderModal();
  }

  openBookmarkModal() {
    this.bookmarkService.newBookmarkModalSrc.next(true);
  }

  refreshBookmarks(userId: string, folderName: string) {
    this.getBookmarkFolders(userId, 'Bookmarks');
    this.getBookmarks(userId, folderName);
  }

  deleteBookmark(id: string, userId: string, folderName: string) {
    this.deleteBookmarkSubscription = this.bookmarkService.deleteBookmark(id, userId).subscribe(() => {
      this.getBookmarks(this.user._id, folderName);
    });
  }

  deleteCurrentFolder(folderId: string, userId: string, folderName: string) {
    this.deleteFolderSubscription = this.folderService.deleteFolder(folderId, userId).subscribe(() => {
      this.refreshBookmarks(userId, folderName);
    });
  }
}
