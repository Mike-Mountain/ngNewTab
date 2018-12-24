import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../models/task.model';
import {MatDialogRef} from '@angular/material';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  @Input() tasksModalRef: MatDialogRef<any>;
  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private tasksService: TasksService) {
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [new Date()],
    });
  }

  addTask(task: Task) {
    const {title, description, dueDate} = task;
    ++ this.tasksService.sid_int;
    let sid = `MI-${this.tasksService.sid_int}`;
    if (this.tasksService.sid_int <= 9) {
      sid = `MI-0${this.tasksService.sid_int}`;
    }
    console.log(sid);
    this.tasksService.addTask({title: title, complete: false, description: description, dueDate: dueDate, sid: sid})
      .then(() => {
        this.closeDialog();
      })
      .catch(err => {
        console.log(err);
        this.closeDialog();
      });
  }

  closeDialog() {
    this.tasksModalRef.close();
  }

}
