import {Injectable} from '@angular/core';
import {Bookmark} from '../models/bookmark.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SharedService} from '../../shared/services/shared.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../../shared/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  newBookmarkModalSrc = new BehaviorSubject<boolean>(false);
  newBookmarkModal = this.newBookmarkModalSrc.asObservable();

  testUrl = 'http://httpstat.us/500';
  bookmarksUrl = 'http://localhost:3000/bookmarks';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private sharedService: SharedService,
              private messageService: MessageService,
              private http: HttpClient) {
  }

  findBookmarksByUser(userId: string): Observable<Bookmark[]> {
    const url = `${this.bookmarksUrl}/${userId}`;
    // const url = this.testUrl;
    const http$ = this.http.get<Bookmark[]>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully fetched';
        this.messageService.addMessage(userId, message, false, false, 'Bookmarks', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Bookmarks', 'GET' );
        return of([]);
      })
    );
  }

  getBookmarks(userId: string): Observable<Bookmark[]> {
    const http$ = this.http.get<Bookmark[]>(this.bookmarksUrl);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Fetched';
        this.messageService.addMessage(userId, message, false, false, 'Bookmarks', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Bookmarks', 'GET');
        return of([]);
      })
    );
  }

  getBookmarkById(id: string, userId: string): Observable<Bookmark> {
    const url = `${this.bookmarksUrl}/${id}`;
    const http$ = this.http.get<Bookmark>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully fetched';
        this.messageService.addMessage(userId, message, false, true, 'Bookmark', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err,  'Bookmark', 'GET');
        return of (null);
      })
    );
  }

  findOneBookmark(options: object, userId: string): Observable<Bookmark> {
    const url = `${this.bookmarksUrl}/find`;
    const http$ = this.http.get<Bookmark>(url, options);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully found';
        this.messageService.addMessage(userId, message, false, true, 'Bookmark', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Bookmark', 'GET');
        return of (null);
      })
    );
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    const http$ = this.http.post<Bookmark>(this.bookmarksUrl, bookmark, this.httpOptions);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Added';
        this.messageService.addMessage(bookmark.userId, message, false, true, 'Bookmark', 'POST');
      }),
      catchError(err => {
        this.messageService.addError(bookmark.userId, err,  'Bookmark', 'POST');
        return of(null);
      })
    );
  }

  updateBookmark(id: string, bookmark: Bookmark): Observable<Bookmark> {
    const url = `${this.bookmarksUrl}/${id}`;
    const http$ = this.http.patch<Bookmark>(url, bookmark);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully updated';
        this.messageService.addMessage(bookmark.userId, message, false, true, 'Bookmark', 'PATCH');
      }),
      catchError(err => {
        this.messageService.addError(bookmark.userId, err,  'Bookmark', 'PATCH');
        return of(null);
      })
    );
  }

  deleteBookmark(bookmarkId: string, userId: string): Observable<string> {
    const url = `${this.bookmarksUrl}/${bookmarkId}`;
    const http$ = this.http.delete<string>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Deleted';
        this.messageService.addMessage(userId, message, false, true, 'Bookmark', 'DELETE');
      }),
      catchError(err => {
        this.messageService.addError(userId, err,  'Bookmark', 'DELETE');
        return of ('The Bookmark could not be deleted');
      })
    );
  }
}
