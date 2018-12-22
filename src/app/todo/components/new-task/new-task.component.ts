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
      title: ['', Validators.required]
    });
  }

  addTask(task: Task) {
    const {title, complete} = task;
    this.tasksService.addTask({title: title, complete: false})
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
