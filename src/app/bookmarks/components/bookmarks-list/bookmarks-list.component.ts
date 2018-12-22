import {Component, Input, OnInit} from '@angular/core';
import {BookmarkService} from '../../services/bookmark.service';
import {Bookmark} from '../../models/bookmark.model';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit {

  bookmarks: Bookmark[];

  constructor(public bookmarkService: BookmarkService,
              public sharedService: SharedService) {
  }

  ngOnInit() {
    this.bookmarkService.getBookmarks();
  }

  deleteBookmark(id) {
    this.bookmarkService.deleteBookmark(id);
  }

}
