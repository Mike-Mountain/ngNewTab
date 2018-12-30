import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject} from 'rxjs';
import {SharedService} from '../../shared/services/shared.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedInSrc = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSrc.asObservable();

  fireBaseUserSrc = new BehaviorSubject<any>(null);
  fireBaseUser = this.fireBaseUserSrc.asObservable();
  currentUser: any;

  constructor(private auth: AngularFireAuth,
              private sharedService: SharedService,
              private userService: UserService) {
    this.sharedService.isLoadingSrc.next(true);
    auth.authState.subscribe(authUser => {
      if (authUser) {
        this.userService.getUserById(authUser.uid).subscribe(user => {
          this.fireBaseUserSrc.next(user);
          this.isLoggedInSrc.next(true);
        });
      }
      this.sharedService.isLoadingSrc.next(false);
    });
  }

  registerWithEmailAndPassword(email, password, username): Promise<any> {
    this.sharedService.isLoadingSrc.next(true);
    return this.auth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.currentUser = this.auth.auth.currentUser;
        this.userService.createUser(this.currentUser.uid, {
          username: username,
          email: email,
          roles: ['User']
        }).subscribe(user => {
          this.fireBaseUserSrc.next(user);
          this.isLoggedInSrc.next(true);
          this.sharedService.isLoadingSrc.next(false);
        });
      })
      .catch(err => {
        alert(`ERROR: ${err.code} -> ${err.message}`);
        this.sharedService.isLoadingSrc.next(false);
      });
  }

  loginWithEmailAndPassword(email, password): Promise<any> {
    this.sharedService.isLoadingSrc.next(true);
    return this.auth.auth.signInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.userService.getUserById(authUser.user.uid).subscribe(user => {
          this.fireBaseUserSrc.next(user);
          this.isLoggedInSrc.next(true);
          this.sharedService.isLoadingSrc.next(false);
        });
      })
      .catch(err => {
        alert(`ERROR: ${err.code} -> ${err.message}`);
        this.sharedService.isLoadingSrc.next(false);
      });
  }

  signOut(): Promise<any> {
    this.sharedService.isLoadingSrc.next(true);
    return this.auth.auth.signOut()
      .then(res => {
        this.fireBaseUserSrc.next(null);
        this.isLoggedInSrc.next(false);
        this.sharedService.isLoadingSrc.next(false);
      })
      .catch(err => {
        alert(`ERROR: ${err.code} -> ${err.message}`);
        this.sharedService.isLoadingSrc.next(false);
      });
  }

}
