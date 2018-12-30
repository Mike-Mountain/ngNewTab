export class Bookmark {
  userId: string;
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  url: string;
  faviconUrl: string;

  constructor(options: any) {
    this.userId = options && options.userId;
    this.title = options && options.title;
    this.description = options && options.description;
    this.url = options && options.url;
    this.faviconUrl = `${this.url}/favicon.ico`;
  }
}
