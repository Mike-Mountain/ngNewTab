import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {MaterialModule} from '../material/material.module';
import { NewTaskComponent } from './components/new-task/new-task.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    TodoListComponent,
    NewTaskComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    TodoListComponent,
    NewTaskComponent
  ]
})
export class TodoModule { }
