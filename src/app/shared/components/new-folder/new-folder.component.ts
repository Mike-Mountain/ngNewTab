import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FolderService} from '../../services/folder.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {Folder} from '../../models/folder.model';
import {User} from '../../../users/models/user.model';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit, OnDestroy {

  @ViewChild('newFolder') newFolder: TemplateRef<HTMLElement>;

  @Input() user: User;
  @Input() folderFor: string;
  @Output() addedFolder = new EventEmitter<Folder>();

  newBookmarkFolderSubscription: Subscription;
  newTaskFolderSubscription: Subscription;
  newNoteFolderSubscription: Subscription;
  addNewFolderSubscription: Subscription;

  newFolderForm: FormGroup;

  bookmarkDialog: MatDialogRef<any>;
  taskDialog: MatDialogRef<any>;
  notesDialog: MatDialogRef<any>;

  options: MatDialogConfig;

  constructor(public folderService: FolderService,
              private formBuilder: FormBuilder,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.options = {
      width: '35%'
    };
    switch (this.folderFor) {
      case 'Bookmarks':
        this.newBookmarkFolderSubscription = this.folderService.newBookmarkFolder.subscribe(isOpen => {
          if (isOpen) {
            this.bookmarkDialog = this.matDialog.open(this.newFolder, this.options);
          }
        });
        break;
      case 'Tasks':
        this.newTaskFolderSubscription = this.folderService.newTaskFolder.subscribe(isOpen => {
          if (isOpen) {
            this.taskDialog = this.matDialog.open(this.newFolder, this.options);
          }
        });
        break;
      case 'Notes':
        this.newNoteFolderSubscription = this.folderService.newNoteFolder.subscribe(isOpen => {
          if (isOpen) {
            this.notesDialog = this.matDialog.open(this.newFolder, this.options);
          }
        });
        break;
      default:
        return false;
    }
    this.newFolderForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      iconUrl: ['']
    });
  }

  ngOnDestroy() {
    if (this.newBookmarkFolderSubscription) {
      this.newBookmarkFolderSubscription.unsubscribe();
    }
    if (this.newTaskFolderSubscription) {
      this.newTaskFolderSubscription.unsubscribe();
    }
    if (this.newNoteFolderSubscription) {
      this.newNoteFolderSubscription.unsubscribe();
    }
    if (this.addNewFolderSubscription) {
      this.addNewFolderSubscription.unsubscribe();
    }
  }

  addFolder(folder: Folder) {
    const newFolder = new Folder({
      userId: this.user._id,
      folderFor: this.folderFor,
      name: folder.name,
      description: folder.description,
      iconUrl: folder.iconUrl
    });
    this.addNewFolderSubscription = this.folderService.addFolder(newFolder).subscribe((newItem) => {
      this.closeDialog();
      this.addedFolder.emit(newItem);
    });
  }

  closeDialog() {
    if (this.newBookmarkFolderSubscription) {
      this.folderService.newBookmarkFolderSrc.next(false);
      this.bookmarkDialog.close();
    }
    if (this.newTaskFolderSubscription) {
      this.folderService.newTaskFolderSrc.next(false);
      this.taskDialog.close();
    }
    if (this.newNoteFolderSubscription) {
      this.folderService.newNoteFolderSrc.next(false);
      this.notesDialog.close();
    }
  }

}
