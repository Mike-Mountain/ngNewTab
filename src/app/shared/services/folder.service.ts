import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Folder} from '../models/folder.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Note} from '../../notes/models/note.model';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  newBookmarkFolderSrc = new BehaviorSubject<boolean>(false);
  newBookmarkFolder = this.newBookmarkFolderSrc.asObservable();

  newTaskFolderSrc = new BehaviorSubject<boolean>(false);
  newTaskFolder = this.newTaskFolderSrc.asObservable();

  newNoteFolderSrc = new BehaviorSubject<boolean>(false);
  newNoteFolder = this.newNoteFolderSrc.asObservable();

  foldersUrl = 'http://localhost:3000/folders';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  openNewBookmarkFolderModal() {
    this.newBookmarkFolderSrc.next(true);
  }

  openNewTaskFolderModal() {
    this.newTaskFolderSrc.next(true);
  }

  openNewNoteFolderModal() {
    this.newNoteFolderSrc.next(true);
  }

  addFolder(folder: Folder): Observable<Folder> {
    const http$ = this.http.post<Note>(this.foldersUrl, folder, this.httpOptions);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Added';
        this.messageService.addMessage(folder.userId, message, false, true, 'Folder', 'POST');
      }),
      catchError(err => {
        this.messageService.addError(folder.userId, err, 'Folder', 'POST');
        return of(null);
      })
    );
  }

  updateFolder(folder?: Folder) {
    const url = `${this.foldersUrl}/${folder._id}`;
    const http$ = this.http.patch<Note>(url, folder);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Updated';
        this.messageService.addMessage(folder.userId, message, false, true, 'Folder', 'PATCH');
      }),
      catchError(err => {
        this.messageService.addError(folder.userId, err, 'Folder', 'PATCH');
        return of(null);
      })
    );
  }

  deleteFolder(id: string, userId: string): Observable<string> {
    const url = `${this.foldersUrl}/${id}`;
    const http$ = this.http.delete<string>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Deleted';
        this.messageService.addMessage(userId, message, false, true, 'Folder', 'DELETE');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Folder', 'DELETE');
        return of('The Folder could note be deleted');
      })
    );
  }

}
