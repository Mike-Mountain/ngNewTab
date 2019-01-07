import {Component, EventEmitter, HostListener, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {SearchType} from '../../models/search-type.model';
import {searchTypes} from '../../constants/constants';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @ViewChild('searchQuery') searchQuery: TemplateRef<HTMLInputElement>;

  @Output() closeSearch = new EventEmitter();

  faSearch = faSearch;
  searchTypes = searchTypes;
  currentSearch: SearchType;
  searchQueryUrl: string;
  mainSearchQuery: string;
  secondarySearchQuery: string;

  public pressedButton = '';

  constructor(private searchService: SearchService) {
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeyPressEvent(event: KeyboardEvent, query: string, secondaryQuery: string) {
    event.stopPropagation();
    this.pressedButton = event.key;
    if (this.pressedButton === 'Enter' && query) {
      this.search(query, secondaryQuery);
    }
  }

  ngOnInit() {
    this.currentSearch = this.searchTypes[0];
    this.searchQueryUrl = this.currentSearch.url;
  }

  changeSearchType(type: SearchType) {
    this.currentSearch = type;
    this.searchQueryUrl = this.currentSearch.url;
  }

  search(query: string, secondaryQuery: string) {
    const url = `https://google.com/search?q=${query}`;
    const searchType = this.searchService.checkSearchType(this.currentSearch.name);
    // There's a space here because the url auto-escapes it anyway and the search breaks without it.
    // eg: 'https://google.com/search?q=array%20%site:stackoverflow.com' vs 'https://google.com/search?q=arraysite:stackoverflow.com'
    this.currentSearch.url = `${url} ${searchType}`;
    if (secondaryQuery !== '') {
      switch (this.currentSearch.name) {
        case 'Reddit':
          this.currentSearch.url = `${url} ${searchType}/r/${secondaryQuery}`;
      }
    }
    window.open(this.currentSearch.url, '_blank');
  }

  close() {
    this.closeSearch.emit('closed');
  }

}
