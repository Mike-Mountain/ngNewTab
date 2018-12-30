import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = 'http://localhost:3000/users';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  createUser(firebaseId: string, user: User): Observable<User> {
    const newUser = new User({
      _id: firebaseId,
      username: user.username,
      email: user.email,
      roles: user.roles
    });
    return this.http.post<User>(this.userUrl, newUser, this.httpOptions);
  }

  getAllUsers(): Observable<User> {
    return this.http.get<User>(this.userUrl);
  }

  getUserById(id: string): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url);
  }

  findUser(options: object): Observable<User> {
    const url = `${this.userUrl}/find`;
    return this.http.get<User>(url, options);
  }

  updateUser(uid, newValue: User): Observable<User> {
    const url = `${this.userUrl}/${uid}`;
    return this.http.patch<User>(url, newValue);
  }

  deleteUser(uid): Observable<string> {
    const url = `${this.userUrl}/${uid}`;
    return this.http.delete<string>(url);
  }
}
