import {Injectable} from '@angular/core';
import {Bookmark} from '../models/bookmark.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {SharedService} from '../../shared/services/shared.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  newBookmarkModalSrc = new BehaviorSubject<boolean>(false);
  newBookmarkModal = this.newBookmarkModalSrc.asObservable();

  bookmarksUrl = 'http://localhost:3000/bookmarks';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private sharedService: SharedService,
              private http: HttpClient) {
  }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.bookmarksUrl);
  }

  getBookmarkById(id: string): Observable<Bookmark> {
    const url = `${this.bookmarksUrl}/${id}`;
    return this.http.get<Bookmark>(url);
  }

  findOneBookmark(options: object): Observable<Bookmark> {
    const url = `${this.bookmarksUrl}/find`;
    return this.http.get<Bookmark>(url, options);
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.bookmarksUrl, bookmark, this.httpOptions);
  }

  updateBookmark(id: string, bookmark: Bookmark): Observable<Bookmark> {
    const url = `${this.bookmarksUrl}/${id}`;
    return this.http.patch<Bookmark>(url, bookmark);
  }

  deleteBookmark(id: string): Observable<string> {
    const url = `${this.bookmarksUrl}/${id}`;
    return this.http.delete<string>(url);
  }


}
