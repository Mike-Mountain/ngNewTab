import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {TasksService} from '../../services/tasks.service';
import {Task} from '../../models/task.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(public sharedService: SharedService,
              public tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService.getTasks();
  }

  updateTask(task: Task, status) {
    this.tasksService.completeTask(task, status);
  }

  deleteTask(task) {
    this.tasksService.deleteTask(task.id);
  }

}
