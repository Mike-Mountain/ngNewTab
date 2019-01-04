import {Injectable} from '@angular/core';
import {Note} from '../models/note.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SharedService} from '../../shared/services/shared.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../../shared/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Observable<Note[]>;

  notesUrl = 'http://localhost:3000/notes';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  selectedNoteSrc = new BehaviorSubject<Note>(null);
  selectedNoteFromService = this.selectedNoteSrc.asObservable();

  noteAddedSrc = new BehaviorSubject<boolean>(false);
  noteAdded = this.noteAddedSrc.asObservable();

  isEditableSrc = new BehaviorSubject<boolean>(false);
  isEditable = this.isEditableSrc.asObservable();

  public isLoadingNotes: boolean;

  constructor(private sharedService: SharedService,
              private messageService: MessageService,
              private http: HttpClient) {
  }

  findNotesByUser(userId: string): Observable<Note[]> {
    const url = `${this.notesUrl}/user/${userId}`;
    const http$ = this.http.get<Note[]>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Found';
        this.messageService.addMessage(userId, message, false, false, 'Notes', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Notes', 'GET');
        return of([]);
      })
    );
  }

  getAllNotes(userId): Observable<Note[]> {
    const http$ = this.http.get<Note[]>(this.notesUrl);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Fetched';
        this.messageService.addMessage(userId, message, false, false, 'Notes', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Notes', 'GET');
        return of([]);
      })
    );
  }

  getNoteById(id: string, userId: string): Observable<Note> {
    const url = `${this.notesUrl}/note/${id}`;
    const http$ = this.http.get<Note>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Fetched';
        this.messageService.addMessage(userId, message, false, true, 'Note', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Note', 'GET');
        return of(null);
      })
    );
  }

  findOneNote(options: object, userId: string): Observable<Note> {
    const url = `${this.notesUrl}/find`;
    const http$ = this.http.get<Note>(url, options);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Found';
        this.messageService.addMessage(userId, message, false, true, 'Note', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Note', 'GET');
        return of(null);
      })
    );
  }

  selectNote(note: Note) {
    this.isLoadingNotes = true;
    this.selectedNoteSrc.next(note);
    this.isLoadingNotes = false;
  }

  addNote(note: Note): Observable<Note> {
    const http$ = this.http.post<Note>(this.notesUrl, note, this.httpOptions);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Added';
        this.messageService.addMessage(note.userId, message, false, true, 'Note', 'POST');
      }),
      catchError(err => {
        this.messageService.addError(note.userId, err, 'Note', 'POST');
        return of(null);
      })
    );
  }

  updateNote(id: string, note: Note) {
    const url = `${this.notesUrl}/${id}`;
    const http$ = this.http.patch<Note>(url, note);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Updated';
        this.messageService.addMessage(note.userId, message, false, true, 'Note', 'PATCH');
      }),
      catchError(err => {
        this.messageService.addError(note.userId, err, 'Note', 'PATCH');
        return of(null);
      })
    );
  }

  deleteNote(id: string, userId: string): Observable<string> {
    const url = `${this.notesUrl}/${id}`;
    const http$ = this.http.delete<string>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Deleted';
        this.messageService.addMessage(userId, message, false, true, 'Note', 'DELETE');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Note', 'DELETE');
        return of('The Note could note be deleted');
      })
    );
  }
}
