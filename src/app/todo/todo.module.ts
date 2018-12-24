import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {MaterialModule} from '../material/material.module';
import { NewTaskComponent } from './components/new-task/new-task.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

@NgModule({
  declarations: [
    TodoListComponent,
    NewTaskComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    TodoListComponent,
    NewTaskComponent
  ]
})
export class TodoModule { }
