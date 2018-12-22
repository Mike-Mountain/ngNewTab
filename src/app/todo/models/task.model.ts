export class Task {
  id?: string;
  title: string;
  complete: boolean;

  constructor(options: any) {
    this.title = options && options.title;
    this.complete = options && options.complete || false;
  }
}
