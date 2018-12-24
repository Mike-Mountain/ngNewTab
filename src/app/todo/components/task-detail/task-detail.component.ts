import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../models/task.model';
import {FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  @Input() selectedTask: Task;
  @Input() dialogRef: MatDialogRef<any>;
  taskName: FormControl;
  taskDescription: FormControl;
  editTaskTitle: boolean;
  editTaskDescription: boolean;

  constructor(public tasksService: TasksService) {
  }

  ngOnInit() {
    this.taskName = new FormControl(this.selectedTask.title);
    this.taskDescription = new FormControl(this.selectedTask.description);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteTask() {
    this.tasksService.deleteTask(this.selectedTask.id);
    this.closeDialog();
  }

  updateTaskStatus(status: string) {
    this.tasksService.completeTask(this.selectedTask, status);
    this.closeDialog();
  }

  updateTask() {
    this.selectedTask.title = this.taskName.value;
    this.selectedTask.description = this.taskDescription.value;
    this.tasksService.updateTask(this.selectedTask);
    this.editTaskTitle = false;
    this.editTaskDescription = false;
  }

}
