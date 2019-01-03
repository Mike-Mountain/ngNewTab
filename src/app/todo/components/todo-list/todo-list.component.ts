import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {TasksService} from '../../services/tasks.service';
import {Task} from '../../models/task.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../users/services/auth.service';
import {User} from '../../../users/models/user.model';

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

  user: User;

  viewAllTasksSubscription: Subscription;
  deleteTaskSubscription: Subscription;
  updateTaskSubscription: Subscription;
  userSubsription: Subscription;

  constructor(public sharedService: SharedService,
              public tasksService: TasksService,
              public authService: AuthService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.userSubsription = this.authService.fireBaseUser.subscribe((user: User) => {
      this.getAllTasks(user._id);
      this.user = user;
    });
    this.newTaskModalSubscription = this.tasksService.newTaskModal.subscribe(isOpen => {
      if (isOpen) {
        this.newTaskModalRef = this.matDialog.open(this.taskForm, {
          width: '40rem'
        });
      } else {
        this.matDialog.closeAll();
      }
    });
  }

  ngOnDestroy() {
    this.userSubsription.unsubscribe();
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
    this.getAllTasks(this.user._id);
  }

  getAllTasks(userId: string) {
    this.viewAllTasksSubscription = this.tasksService.findTasksByUser(userId).subscribe(tasks => {
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
    this.updateTaskSubscription = this.tasksService.completeTask(task, status).subscribe(() => {
    });
  }

  deleteTask(task: Task) {
    this.deleteTaskSubscription = this.tasksService.deleteTask(task._id, task.userId).subscribe(() => {
      this.getAllTasks(this.user._id);
    });
  }

}
