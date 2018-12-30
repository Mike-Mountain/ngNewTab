import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookmarkService} from '../../services/bookmark.service';
import {Bookmark} from '../../models/bookmark.model';
import {MatDialogRef} from '@angular/material';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-new-bookmark',
  templateUrl: './new-bookmark.component.html',
  styleUrls: ['./new-bookmark.component.scss']
})
export class NewBookmarkComponent implements OnInit {

  @Input() dialogRef: MatDialogRef<any>;
  @Output() addedBookmark = new EventEmitter();
  bookmarkForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private bookmarkService: BookmarkService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.bookmarkForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      url: ['', Validators.required]
    });
  }

  addBookmark(bookmark: Bookmark) {
    const {title, description} = bookmark;
    const faviconUrl = `https://${this.sharedService.getFaviconUrl(bookmark.url)}`;
    const url = `https://${bookmark.url}`;
    this.bookmarkService.addBookmark({title, description, url, faviconUrl}).subscribe(bookmark => {
      this.addedBookmark.emit();
      this.closeDialog();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
