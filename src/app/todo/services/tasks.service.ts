import {Injectable} from '@angular/core';
import {Task} from '../models/task.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  newTaskModalSrc = new BehaviorSubject<boolean>(false);
  newTaskModal = this.newTaskModalSrc.asObservable();
  sid_int: number;

  todoUrl = 'http://localhost:3000/todos';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  findTasksByUser(userId: string): Observable<Task[]> {
    const url = `${this.todoUrl}/${userId}`;
    return this.http.get<Task[]>(url);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.todoUrl);
  }

  getTaskById(id: string): Observable<Task> {
    const url = `${this.todoUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  findOneTask(options: object): Observable<Task> {
    const url = `${this.todoUrl}/find`;
    return this.http.get<Task>(url, options);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.todoUrl, task, this.httpOptions);
  }

  completeTask(task: Task, status: string): Observable<Task> {
    status === 'complete' ? task.complete = true : task.complete = false;
    return this.updateTask(task._id, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    const url = `${this.todoUrl}/${id}`;
    return this.http.patch<Task>(url, task);
  }

  deleteTask(id: string): Observable<string> {
    const url = `${this.todoUrl}/${id}`;
    return this.http.delete<string>(url);
  }
}
