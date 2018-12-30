import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {SearchType, searchTypes} from '../../models/search-type.model';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output() closeSearch = new EventEmitter();

  faSearch = faSearch;
  searchTypes = searchTypes;
  currentSearch: SearchType;
  searchQueryUrl: string;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.currentSearch = this.searchTypes[0];
    this.searchQueryUrl = this.currentSearch.url;
  }

  changeSearchType(type: SearchType) {
    this.currentSearch = type;
    this.searchQueryUrl = this.currentSearch.url;
  }

  search(query) {
    const url = `https://google.com/search?q=${query}`;
    const searchType = this.searchService.checkSearchType(this.currentSearch.name);
    this.currentSearch.url = `${url} ${searchType}`;
    window.open(this.currentSearch.url, '_blank');
  }

  close() {
    this.closeSearch.emit('closed');
  }

}
