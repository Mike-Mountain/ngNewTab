import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

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
  isSettings: boolean;

  constructor() {
  }

  getFaviconUrl(url: string): string {
    const strings = url.split('/');
    return `${strings[0]}/favicon.ico`;
  }
}
