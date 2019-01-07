import {Injectable} from '@angular/core';
import {Task} from '../models/task.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../../shared/services/message.service';
import {SharedService} from '../../shared/services/shared.service';
import {FolderService} from '../../shared/services/folder.service';
import {Folder} from '../../shared/models/folder.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  newTaskModalSrc = new BehaviorSubject<boolean>(false);
  newTaskModal = this.newTaskModalSrc.asObservable();

  sid_int: number;

  foldersUrl = 'http://localhost:3000/folders';
  todoUrl = 'http://localhost:3000/todos';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private sharedService: SharedService,
              private messageService: MessageService,
              private folderService: FolderService) {
  }

  getTaskFolders(userId: string, folderFor: string): Observable<Folder[]> {
    const url = `${this.foldersUrl}/type/${folderFor}/user/${userId}`;
    const http$ = this.http.get<Folder[]>(url, this.httpOptions);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully fetched';
        this.messageService.addMessage(userId, message, false, false, 'Folders', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Folders', 'GET');
        return of([]);
      })
    );
  }

  findTasksByFolder(userId: string, folderName: string): Observable<Task[]> {
    const url = `${this.todoUrl}/folder/${folderName}/user/${userId}`;
    const http$ = this.http.get<Task[]>(url, this.httpOptions);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully fetched';
        this.messageService.addMessage(userId, message, false, false, 'Tasks', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Tasks', 'GET');
        return of([]);
      })
    );
  }

  findTasksByUser(userId: string): Observable<Task[]> {
    const url = `${this.todoUrl}/${userId}`;
    const http$ = this.http.get<Task[]>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Found';
        this.messageService.addMessage(userId, message, false, false, 'Tasks', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Tasks', 'GET');
        return of([]);
      })
    );
  }

  getAllTasks(userId: string): Observable<Task[]> {
    const http$ = this.http.get<Task[]>(this.todoUrl);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Fetched';
        this.messageService.addMessage(userId, message, false, false, 'Tasks', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Tasks', 'GET');
        return of([]);
      })
    );
  }

  getTaskById(id: string, userId: string): Observable<Task> {
    const url = `${this.todoUrl}/${id}`;
    const http$ = this.http.get<Task>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully fetched';
        this.messageService.addMessage(userId, message, false, true, 'Task', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Task', 'GET');
        return of(null);
      })
    );
  }

  findOneTask(options: object, userId: string): Observable<Task> {
    const url = `${this.todoUrl}/find`;
    const http$ = this.http.get<Task>(url, options);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Found';
        this.messageService.addMessage(userId, message, false, true, 'Task', 'GET');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Task', 'GET');
        return of(null);
      })
    );
  }

  addTask(task: Task): Observable<Task> {
    const http$ = this.http.post<Task>(this.todoUrl, task, this.httpOptions);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Added';
        this.messageService.addMessage(task.userId, message, false, true, 'Task', 'POST');
      }),
      catchError(err => {
        this.messageService.addError(task.userId, err, 'Task', 'POST');
        return of(null);
      })
    );
  }

  completeTask(task: Task, status: string): Observable<Task> {
    console.log('status:', status);
    status === 'complete' ? task.complete = true : task.complete = false;
    return this.updateTask(task._id, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    const url = `${this.todoUrl}/${id}`;
    const http$ = this.http.patch<Task>(url, task);
    return http$.pipe(
      tap((update: Task) => {
        console.log('Updated:', update);
        const message = 'Successfully Updated';
        this.messageService.addMessage(task.userId, message, false, true, 'Task', 'PATCH');
      }),
      catchError(err => {
        this.messageService.addError(task.userId, err, 'Task', 'PATCH');
        return of(null);
      })
    );
  }

  deleteTask(id: string, userId: string): Observable<string> {
    const url = `${this.todoUrl}/${id}`;
    const http$ = this.http.delete<string>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Deleted';
        this.messageService.addMessage(userId, message, false, true, 'Task', 'DELETE');
      }),
      catchError(err => {
        this.messageService.addError(userId, err, 'Task', 'DELETE');
        return of('The Task could not be deleted');
      })
    );
  }
}
