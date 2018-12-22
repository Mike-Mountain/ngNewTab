import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {Bookmark} from '../models/bookmark.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SharedService} from '../../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarksList: AngularFirestoreCollection<Bookmark>;
  bookmarks: Observable<Bookmark[]>;

  constructor(private fireStore: AngularFirestore,
              private sharedService: SharedService) {
  }

  getBookmarks(): Observable<Bookmark[]> {
    this.sharedService.isLoadingSrc.next(true);
    this.bookmarksList = this.fireStore.collection<Bookmark>('bookmarks');
    this.bookmarks = this.bookmarksList.snapshotChanges()
    // Get the ID for each bookmark in the list.
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }));
    this.sharedService.isLoadingSrc.next(false);
    return this.bookmarks;
  }

  addBookmark(bookmark: Bookmark): Promise<DocumentReference> {
    return this.bookmarksList.add(bookmark);
  }

  deleteBookmark(id: string) {
    this.sharedService.isLoadingSrc.next(true);
    this.fireStore.collection('bookmarks').doc(id).delete()
      .then(() => {
        this.sharedService.isLoadingSrc.next(false);
      })
      .catch(err => {
        console.log(err);
        this.sharedService.isLoadingSrc.next(false);
      });
  }


}
