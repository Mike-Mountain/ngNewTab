import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {TasksService} from '../../services/tasks.service';
import {Task} from '../../models/task.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  @ViewChild('taskDetail') taskDetail: TemplateRef<HTMLElement>;
  taskDetailRef: MatDialogRef<any>;

  @ViewChild('taskForm') taskForm: TemplateRef<HTMLElement>;
  newTaskModalRef: MatDialogRef<any>;

  newTaskModalSubscription: Subscription;

  selectedTask: Task;
  tasks: Task[];
  viewAllTasksSubscription: Subscription;
  deleteTaskSubscription: Subscription;
  updateTaskSubscription: Subscription;

  constructor(public sharedService: SharedService,
              public tasksService: TasksService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllTasks();
    this.newTaskModalSubscription = this.tasksService.newTaskModal.subscribe(isOpen => {
      if (isOpen) {
        this.newTaskModalRef = this.matDialog.open(this.taskForm, {
          minWidth: 300,
          width: '35%'
        });
      } else {
        this.matDialog.closeAll();
      }
    });
  }

  ngOnDestroy() {
    this.newTaskModalSubscription.unsubscribe();

    if (this.viewAllTasksSubscription) {
      this.viewAllTasksSubscription.unsubscribe();
    }

    if (this.updateTaskSubscription) {
      this.updateTaskSubscription.unsubscribe();
    }

    if (this.deleteTaskSubscription) {
      this.deleteTaskSubscription.unsubscribe();
    }
  }

  rePopulateTasksList() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.viewAllTasksSubscription = this.tasksService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  openTasksModal() {
    this.tasksService.newTaskModalSrc.next(true);
  }

  viewTaskDetail(task: Task) {
    this.selectedTask = task;
    this.taskDetailRef = this.matDialog.open(this.taskDetail, {
      minWidth: 300,
      width: '35%'
    });
  }

  updateTask(task: Task, status) {
    this.updateTaskSubscription = this.tasksService.completeTask(task, status).subscribe(updatedTask => {
    });
  }

  deleteTask(task) {
    this.deleteTaskSubscription = this.tasksService.deleteTask(task._id).subscribe(deleted => {
      this.getAllTasks();
    });
  }

}
