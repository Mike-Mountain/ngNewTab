import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {LoginComponent} from './components/login/login.component';
import {UserComponent} from './components/user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {RegisterComponent} from './components/register/register.component';
import {SharedModule} from '../shared/shared.module';
import { ListUsersComponent } from './components/list-users/list-users.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    RegisterComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    UserComponent
  ]
})
export class UsersModule {
}
