import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  showPassword = false;
  showConfirmPass = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public authService: AuthService,
              public sharedService: SharedService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
    });
  }

  register() {
    const {username, emailAddress, password, confirmPass} = this.registerForm.value;
    if (password === confirmPass) {
      this.authService.registerWithEmailAndPassword(emailAddress, password, username)
        .then(() => {
          this.router.navigateByUrl('/');
        });
    } else {
      alert('Passwords do not match!');
    }
  }

}
