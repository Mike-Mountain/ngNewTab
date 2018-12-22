import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {Note} from '../models/note.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {SharedService} from '../../shared/services/shared.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notesList: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;

  selectedNoteSrc = new BehaviorSubject<Note>(null);
  selectedNoteFromService = this.selectedNoteSrc.asObservable();

  constructor(private fireStore: AngularFirestore,
              private sharedService: SharedService) {
  }

  getNotes(): Observable<Note[]> {
    this.sharedService.isLoadingSrc.next(true);
    this.notesList = this.fireStore.collection<Note>('notes');
    this.notes = this.notesList.snapshotChanges()
    // Get the ID for each note in the list.
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }));
    this.sharedService.isLoadingSrc.next(false);
    return this.notes;
  }

  addNote(note: Note) {
    const {title, body, created, modified} = note;
    this.notesList.add({title, body, created, modified})
      .then(item => {
        note.id = item.id;
        this.selectedNoteSrc.next(note);
      });
  }

  updateNote(note: Note) {
    const collectionRef = this.fireStore.collection<Note>('notes').doc(note.id);
    collectionRef.get().subscribe(item => {
      item.ref.update({title: note.title, id: note.id, body: note.body, created: note.created, modified: note.modified})
        .catch(err => {
          console.log(err);
        });
    });
  }

  deleteNote(id: string) {
    this.fireStore.collection<Note>('notes').doc(id).delete()
      .catch(err => {
        console.log(err);
      });
  }
}
