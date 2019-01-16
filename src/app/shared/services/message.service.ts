import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Message} from '../models/message.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {useAnimation} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // TODO: Create Messages API to store message logs.
  currentMessageSc = new BehaviorSubject<Message>(null);
  currentMessage = this.currentMessageSc.asObservable();

  messagesUrl = 'http://localhost:3000/messages';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  addError(userId: string, messageBody: string, origin: string, operationType: string) {
    const message = new Message({
      userId: userId,
      origin: origin,
      message: messageBody,
      error: true,
      toDisplay: true,
      operationType: operationType,
      response: messageBody
    });
    this.postMessage(message).subscribe(newMessage => {
      this.currentMessageSc.next(newMessage);
    });
  }

  addMessage(userId: string, messageBody: string, error: boolean, toDisplay: boolean, origin: string, operationType: string) {
    const message = new Message({
      userId: userId,
      origin: origin,
      message: messageBody,
      error: error,
      toDisplay: toDisplay,
      operationType: operationType,
      response: messageBody
    });
    this.postMessage(message).subscribe(newMessage => {
      this.currentMessageSc.next(newMessage);
    });
  }

  messageOnPostOfMessage(userId: string, messageBody: string, error: boolean, toDisplay: boolean, origin: string, operationType: string) {
    const message = new Message({
      userId: userId,
      origin: origin,
      message: messageBody,
      error: error,
      toDisplay: toDisplay,
      operationType: operationType,
      response: messageBody
    });
    this.currentMessageSc.next(message);
  }

  findMessagesByUserId(userId: string): Observable<Message[]> {
    const url = `${this.messagesUrl}/${userId}`;
    const http$ = this.http.get<Message[]>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Found';
        this.addMessage(userId, message, false, false, 'Messages', 'GET');
      }),
      catchError(err => {
        this.addError(userId, err, 'Messages', 'GET');
        return of([]);
      })
    );
  }

  getAllMessages(userId: string): Observable<Message[]> {
    const http$ = this.http.get<Message[]>(this.messagesUrl);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Found';
        this.addMessage(userId, message, false, false, 'Messages', 'GET');
      }),
      catchError(err => {
        this.addError(userId, err, 'Messages', 'GET');
        return of([]);
      })
    );
  }

  getMessageById(id: string, userId: string): Observable<Message> {
    const url = `${this.messagesUrl}/${id}`;
    const http$ = this.http.get<Message>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Found';
        this.addMessage(userId, message, false, true, 'Message', 'GET');
      }),
      catchError(err => {
        this.addError(userId, err, 'Message', 'GET');
        return of(null);
      })
    );
  }

  findMessagesByCategory(category: string, userId: string): Observable<Message[]> {
    const url = `${this.messagesUrl}/${category}`;
    const http$ = this.http.get<Message[]>(url);
    return http$.pipe(
      tap(() => {
        const message = `Successfully Found`;
        this.addMessage(userId, message, false, true, 'Messages', 'GET');
      }),
      catchError(err => {
        this.addError(userId, err, 'Messages', 'GET');
        return of([]);
      })
    );
  }

  findMessagesByType(error: boolean, userId: string): Observable<Message[]> {
    const url = `${this.messagesUrl}/${error}`;
    const http$ = this.http.get<Message[]>(url);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Found';
        this.addMessage(userId, message, false, true, 'Messages', 'GET');
      }),
      catchError(err => {
        this.addError(userId, err, 'Messages', 'GET');
        return of([]);
      })
    );
  }

  postMessage(message: Message): Observable<Message> {
    const http$ = this.http.post<Message>(this.messagesUrl, message, this.httpOptions);
    return http$.pipe(
      tap(() => {
        const messageText = 'Successfully Added';
        // console.log(messageText);
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }

  updateMessage(id: string, message: Message): Observable<Message> {
    const url = `${this.messagesUrl}/${id}`;
    const http$ = this.http.patch<Message>(url, message, this.httpOptions);
    return http$.pipe(
      tap(() => {
        const messageText = 'Successfully Updated';
        this.addMessage(message.userId, messageText, false, true, 'Message', 'PATCH');
      })
    );
  }

  deleteMessage(id: string, userId: string): Observable<string> {
    const url = `${this.messagesUrl}/${id}`;
    const http$ = this.http.delete<string>(url, this.httpOptions);
    return http$.pipe(
      tap(() => {
        const message = 'Successfully Deleted';
        this.addMessage(userId, message, false, true, 'Message', 'DELETE');
      }),
      catchError(err => {
        this.addError(userId, err, 'Message', 'DELETE');
        return of('The Message could not be deleted');
      })
    );
  }
}
