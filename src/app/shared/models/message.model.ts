import {HttpErrorResponse} from '@angular/common/http';

export class Message {
  userId: string;
  origin: string;
  message: any;
  error: boolean;
  toDisplay: boolean;
  operationType: string;
  time: Date;
  response: HttpErrorResponse;

  constructor(options: any) {
    this.userId = options && options.userId;
    this.origin = options && options.origin;
    this.message = options && options.message;
    this.error = options && options.error;
    this.toDisplay = options && options.toDisplay;
    this.operationType = options && options.operationType;
    this.time = new Date();
    this.response = options && options.response;
  }
}
