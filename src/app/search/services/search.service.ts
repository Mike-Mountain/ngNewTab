import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
  }

  checkSearchType(value: string): string {
    switch (true) {
      case value.includes('Google'):
        return '';
      case value.includes('StackOverflow'):
        return `site:stackoverflow.com`;
      case value.includes('Dribbble'):
        return 'site:dribbble.com';
      case value.includes('Medium'):
        return 'site:medium.com';
      case value.includes('FreeCodeCamp'):
        return 'site:freecodecamp.medium.com';
      case value.includes('Reddit'):
        return 'site:reddit.com';
      default:
        return '';
    }
  }
}
