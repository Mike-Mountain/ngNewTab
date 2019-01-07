import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookmarkService} from '../../services/bookmark.service';
import {Bookmark} from '../../models/bookmark.model';
import {MatDialogRef, MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material';
import {SharedService} from '../../../shared/services/shared.service';
import {User} from '../../../users/models/user.model';
import {Folder} from '../../../shared/models/folder.model';

@Component({
  selector: 'app-new-bookmark',
  templateUrl: './new-bookmark.component.html',
  styleUrls: ['./new-bookmark.component.scss']
})
export class NewBookmarkComponent implements OnInit {

  @Input() dialogRef: MatDialogRef<any>;
  @Input() user: User;
  @Input() folders: Folder[];
  @Input() currentFolder: Folder;
  @Output() addedBookmark = new EventEmitter();

  bookmarkForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private bookmarkService: BookmarkService) {
  }

  ngOnInit() {
    this.bookmarkForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      url: ['', Validators.required],
      folder: [this.currentFolder.name, Validators.required],
    });
  }

  addBookmark(title, description, bookmarkUrl) {
    const userId = this.user && this.user._id;
    const url = `https://${bookmarkUrl}`;
    const faviconUrl = `https://${SharedService.getFaviconUrl(bookmarkUrl)}`;
    const folder = this.bookmarkForm.value.folder;

    this.bookmarkService.addBookmark({userId, title, description, url, faviconUrl, folder}, folder).subscribe(() => {
      this.addedBookmark.emit();
      this.closeDialog();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
