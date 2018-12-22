import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() selectedTask: Task;

  constructor() {
  }

  ngOnInit() {
  }

}
