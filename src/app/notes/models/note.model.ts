export class Note {
  _id?: string;
  id?: string;
  title: string;
  body: string;
  created: Date;
  modified: Date;

  constructor(options: any) {
    this.title = options && options.title || 'New Note';
    this.body = options && options.body || 'Click to edit...';
    this.created = options && options.created || new Date();
    this.modified = options && options.modified || new Date();
  }
}
