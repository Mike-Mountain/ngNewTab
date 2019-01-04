import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../users/services/auth.service';
import {SharedService} from '../../../shared/services/shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentDate: Date;
  currentWeather: string;

  constructor(public authService: AuthService,
              public sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.currentWeather = 'Clear, 32 degrees.';
  }

  openSettings() {
    this.sharedService.isSettings ? this.sharedService.isSettings = false : this.sharedService.isSettings = true;
    if (this.sharedService.isSettings) {
      this.router.navigateByUrl('/settings');
    } else {
      this.router.navigateByUrl('/');
    }
  }

}
