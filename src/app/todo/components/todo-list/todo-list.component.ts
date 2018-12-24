import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {TasksService} from '../../services/tasks.service';
import {Task} from '../../models/task.model';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @ViewChild('taskDetail') taskDetail: TemplateRef<HTMLElement>;
  taskDetailRef: MatDialogRef<any>;

  selectedTask: Task;

  constructor(public sharedService: SharedService,
              public tasksService: TasksService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.tasksService.getTasks();
  }

  viewTaskDetail(task: Task) {
    this.selectedTask = task;
    this.taskDetailRef = this.matDialog.open(this.taskDetail, {
      minWidth: 300,
      width: '35%'
    });
  }

  updateTask(task: Task, status) {
    this.tasksService.completeTask(task, status);
  }

  deleteTask(task) {
    this.tasksService.deleteTask(task.id);
  }

}
