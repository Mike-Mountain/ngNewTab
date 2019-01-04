import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() taskDeleted = new EventEmitter();

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
    this.tasksService.deleteTask(this.selectedTask._id, this.selectedTask.userId).subscribe(() => {
      this.taskDeleted.emit();
      this.closeDialog();
    });
  }

  updateTaskStatus(status: string) {
    this.tasksService.completeTask(this.selectedTask, status);
    this.closeDialog();
  }

  updateTask() {
    this.selectedTask.title = this.taskName.value;
    this.selectedTask.description = this.taskDescription.value;
    this.tasksService.updateTask(this.selectedTask._id, this.selectedTask).subscribe(() => {
      this.editTaskTitle = false;
      this.editTaskDescription = false;
    });
  }

}
