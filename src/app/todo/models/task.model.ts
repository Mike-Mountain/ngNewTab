export class Task {
  userId: string;
  _id?: string;
  sid?: string;
  title: string;
  description?: string;
  dueDate?: Date;
  complete: boolean;

  constructor(options: any) {
    this.userId = options && options.userId;
    this.title = options && options.title;
    this.complete = options && options.complete || false;
    this.description = options && options.description;
    this.dueDate = options && options.dueDate;
    this.sid = options && options.sid;
  }
}
