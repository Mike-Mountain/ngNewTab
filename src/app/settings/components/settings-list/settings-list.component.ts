import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../users/services/auth.service';
import {Router} from '@angular/router';
import {SharedService} from '../../../shared/services/shared.service';
import {UserService} from '../../../users/services/user.service';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {

  constructor(public authService: AuthService,
              public sharedService: SharedService,
              private router: Router,
              public userService: UserService) {
  }

  ngOnInit() {
  }

  closeSettings() {
    this.sharedService.isSettings = false;
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigateByUrl('/user/login').then(() => {
        this.sharedService.isSettings = false;
      });
    });
  }

  deleteUser(uid) {
    this.userService.deleteUser(uid).subscribe(a => {
      console.log(a);
    });
  }

}
