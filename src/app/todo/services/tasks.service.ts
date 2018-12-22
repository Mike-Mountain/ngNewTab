import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {Task} from '../models/task.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksList: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;

  constructor(private fireStore: AngularFirestore) {
  }

  getTasks(): Observable<Task[]> {
    this.tasksList = this.fireStore.collection<Task>('todo');
    this.tasks = this.tasksList.snapshotChanges()
    // Get the ID for each bookmark in the list.
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }));
    return this.tasks;
  }

  addTask(task: Task): Promise<DocumentReference> {
    return this.tasksList.add(task);
  }

  completeTask(task: Task, status: string) {
    status === 'complete' ? task.complete = true : task.complete = false;
    const collectionRef = this.fireStore.collection('todo').doc(task.id);
    collectionRef.get().subscribe(todo => {
      todo.ref.update(task)
        .catch(err => {
          console.log(err);
        });
    });
  }

  deleteTask(id: string) {
    this.fireStore.collection('todo').doc(id).delete()
      .catch(err => {
        console.log(err);
      });
  }
}
