export class Task {
  id?: string;
  title: string;
  description?: string;
  dueDate?: Date;
  complete: boolean;

  constructor(options: any) {
    this.title = options && options.title;
    this.complete = options && options.complete || false;
    this.description = options && options.description;
    this.dueDate = options && options.dueDate;
  }
}
