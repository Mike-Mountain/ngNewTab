import {Injectable} from '@angular/core';
import {Note} from '../models/note.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {SharedService} from '../../shared/services/shared.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  constructor(private sharedService: SharedService,
              private http: HttpClient) {
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

  getNoteById(id: string): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url);
  }

  findOneNote(options: object): Observable<Note> {
    const url = `${this.notesUrl}/find`;
    return this.http.get<Note>(url, options);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, this.httpOptions);
  }

  updateNote(id: string, note: Note) {
    const url = `${this.notesUrl}/${id}`;
    return this.http.patch<Note>(url, note);
  }

  deleteNote(id: string): Observable<string> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.delete<string>(url);
  }
}
