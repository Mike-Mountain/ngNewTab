import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../models/task.model';
import {MatDialogRef} from '@angular/material';
import {TasksService} from '../../services/tasks.service';
import {Subscription} from 'rxjs';
import {User} from '../../../users/models/user.model';
import {Folder} from '../../../shared/models/folder.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  @Input() tasksModalRef: MatDialogRef<any>;
  @Input() user: User;
  @Input() folders: Folder[];
  @Input() currentFolder: Folder;
  @Output() taskAdded = new EventEmitter();
  taskForm: FormGroup;
  addTaskSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private tasksService: TasksService) {
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [new Date()],
      folder: [this.currentFolder.name, Validators.required]
    });
  }

  addTask(task: Task) {
    const {title, description, dueDate, folder} = task;
    const userId = this.user._id;
    // TODO: Fix the sid_int field.
    ++ this.tasksService.sid_int;
    let sid = `MI-${this.tasksService.sid_int}`;
    if (this.tasksService.sid_int <= 9) {
      sid = `MI-0${this.tasksService.sid_int}`;
    }
    const newTask = new Task({
      userId: userId,
      title: title,
      description: description,
      dueDate: dueDate,
      sid: sid,
      complete: false,
      folder: folder
    });
    this.addTaskSubscription = this.tasksService.addTask(newTask).subscribe(todo => {
      this.taskAdded.emit(todo);
      this.closeDialog();
    });
  }

  closeDialog() {
    this.tasksService.newTaskModalSrc.next(false);
    this.tasksModalRef.close();
  }

}
