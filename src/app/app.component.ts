import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './users/services/auth.service';
import {SharedService} from './shared/services/shared.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;

  constructor(public authService: AuthService,
              public sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.currentApp = 'ToDo';
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
