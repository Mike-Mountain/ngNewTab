export class Note {
  userId: string;
  _id?: string;
  id?: string;
  title: string;
  body: string;
  created: Date;
  modified: Date;
  folder: string;

  constructor(options: any) {
    this.userId = options && options.userId;
    this.folder = options && options.folder;
    this.title = options && options.title || 'New Note';
    this.body = options && options.body || 'Click to edit...';
    this.created = options && options.created || new Date();
    this.modified = options && options.modified || new Date();
  }
}
