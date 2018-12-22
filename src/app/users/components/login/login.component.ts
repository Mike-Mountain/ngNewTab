import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../users/services/auth.service';
import {Router} from '@angular/router';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassword = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public authService: AuthService,
              public sharedService: SharedService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logIn() {
    const {email, password} = this.loginForm.value;
    this.authService.loginWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigateByUrl('/');
      });
  }

}
