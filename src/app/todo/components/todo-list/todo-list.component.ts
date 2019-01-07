import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SharedService} from '../../../shared/services/shared.service';
import {TasksService} from '../../services/tasks.service';
import {Task} from '../../models/task.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../users/services/auth.service';
import {User} from '../../../users/models/user.model';
import {Folder} from '../../../shared/models/folder.model';
import {FolderService} from '../../../shared/services/folder.service';

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
  folders: Folder[];
  currentFolder: Folder;

  getTasksFoldersSubscription: Subscription;
  viewAllTasksSubscription: Subscription;
  deleteTaskSubscription: Subscription;
  deleteFolderSubscription: Subscription;
  updateTaskSubscription: Subscription;
  userSubsription: Subscription;

  constructor(public sharedService: SharedService,
              public tasksService: TasksService,
              public authService: AuthService,
              private folderService: FolderService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.userSubsription = this.authService.fireBaseUser.subscribe((user: User) => {
      this.user = user;
      this.getTasksFoldersSubscription = this.tasksService.getTaskFolders(user._id, 'Tasks').subscribe(folders => {
        this.folders = folders;
        this.currentFolder = this.folders[0];
        this.viewAllTasksSubscription = this.tasksService.findTasksByFolder(user._id, this.currentFolder.name).subscribe(tasks => {
          this.tasks = tasks;
        });
      });
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

  rePopulateTasksList(folderName: string) {
    this.getTaskFolders(this.user._id, 'Tasks');
    this.getAllTasks(this.user._id, folderName);
  }

  getTaskFolders(userId: string, folderFor: string) {
    this.getTasksFoldersSubscription = this.tasksService.getTaskFolders(userId, folderFor).subscribe(folders => {
      this.folders = folders;
      this.currentFolder = this.folders[0];
      console.log(this.folders);
    });
  }

  getAllTasks(userId: string, folderName: string, folder?: Folder) {
    this.viewAllTasksSubscription = this.tasksService.findTasksByFolder(userId, folderName).subscribe(tasks => {
      this.tasks = tasks;
      if (folder) {
        this.currentFolder = folder;
      }
    });
  }

  openTasksModal() {
    this.tasksService.newTaskModalSrc.next(true);
  }

  openNewFolderModal() {
    this.folderService.openNewTaskFolderModal();
  }

  viewTaskDetail(task: Task) {
    this.selectedTask = task;
    this.taskDetailRef = this.matDialog.open(this.taskDetail, {
      minWidth: 300,
      width: '40%'
    });
  }

  updateTask(task: Task, status) {
    this.updateTaskSubscription = this.tasksService.completeTask(task, status).subscribe(updatedTask => {
      console.log(updatedTask);
    });
  }

  deleteTask(task: Task, folderName: string) {
    this.deleteTaskSubscription = this.tasksService.deleteTask(task._id, task.userId).subscribe(() => {
      this.getAllTasks(this.user._id, folderName);
    });
  }

  deleteCurrentFolder(folderId: string, userId: string, folderName: string) {
    this.deleteFolderSubscription = this.folderService.deleteFolder(folderId, userId).subscribe(() => {
      this.rePopulateTasksList(folderName);
    });
  }

}
