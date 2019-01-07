import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material';
import {Subscription} from 'rxjs';
import {Message} from '../../models/message.model';
import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @ViewChild('message') message: TemplateRef<HTMLElement>;

  snackBarRef: MatSnackBarRef<any>;
  snackBarConfg: MatSnackBarConfig;
  currentMessage = {
    error: '',
    text: ''
  };
  subscription: Subscription;

  constructor(public messageService: MessageService,
              public sharedService: SharedService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.subscription = this.messageService.currentMessage.subscribe(currentMessage => {
      if (currentMessage && currentMessage.toDisplay) {
        if (currentMessage.error) {
          console.log('currentMessage', currentMessage);
          // If there is a message and it's an error. Create error object and open snackbar with error.
          this.currentMessage = SharedService.switchErrorText(
            currentMessage.message,
            currentMessage.origin,
            currentMessage.operationType
          );
          if (this.currentMessage.error && this.currentMessage.text) {
            this.openSnackBar();
          }
        } else {
          // If there is a message and it is not an error. Open snackbar with success message.
          this.currentMessage = {
            error: '',
            text: `${currentMessage.message} ${currentMessage.origin}`
          };
          this.openSnackBar();
        }
      }
    });
  }

  openSnackBar() {
    this.snackBarConfg = {
      duration: 3000,
      panelClass: ['snackbar-background']
    };
    this.snackBarRef = this.snackBar.openFromTemplate(this.message, this.snackBarConfg);
  }

}
