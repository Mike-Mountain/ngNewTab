import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isLoadingSrc = new BehaviorSubject<boolean>(false);
  isLoading = this.isLoadingSrc.asObservable();

  get currentApp() {
    return this._currentApp;
  }

  set currentApp(value) {
    this._currentApp = value;
  }

  _currentApp: string;
  isSettings = false;

  constructor() {
  }

  static getFaviconUrl(url: string): string {
    const strings = url.split('/');
    return `${strings[0]}/favicon.ico`;
  }

  static switchErrorText(message: HttpErrorResponse, origin: string, operation: string) {
    // Define an empty object to hold the error message
    let textObject = {
      error: '',
      text: ''
    };
    // Check the status and operation type to return the appropriate message
    switch (message.status) {
      case 404:
        return textObject = {
          error: `${message.status} ${message.statusText}`,
          text: `${origin} could not be found`
        };
      case 500:
        const text500 = SharedService.switchError500Text(operation);
        return textObject = {
          error: `${message.status} ${message.statusText}`,
          text: `${text500} ${origin}`
        };
      case 403:
        const text403 = SharedService.switchError403Text(operation);
        return textObject = {
          error: `${message.status} ${message.statusText}`,
          text: `${text403} ${origin}`
        };
      case 504:
        return textObject = {
          error: `${message.status} ${message.statusText}`,
          text: `${origin} timed out`
        };
      default:
        const defaultText = SharedService.switchDefaultErrorText(operation);
        return textObject = {
          error: `${message.status} ${message.statusText}`,
          text: `${origin} ${defaultText}`
        };
    }

  }

  static switchError500Text(operation: string) {
    switch (operation) {
      case 'GET':
        return 'There was an error fetching';
      case 'POST':
        return 'There was an error creating';
      case 'PATCH':
        return 'There was an error updating';
      case 'DELETE':
        return 'There was an error deleting';
    }
  }

  static switchError403Text(operation: string) {
    switch (operation) {
      case 'GET':
        return 'You are not allowed to fetch';
      case 'POST':
        return 'You are not allowed to create';
      case 'PATCH':
        return 'You are not allowed to update';
      case 'DELETE':
        return 'You are not allowed to delete';
    }
  }

  static switchDefaultErrorText(operation: string) {
    switch (operation) {
      case 'GET':
        return 'could not be fetched';
      case 'POST':
        return 'could not be created';
      case 'PATCH':
        return 'could not be updated';
      case 'DELETE':
        return 'could not be deleted';
    }
  }
}
