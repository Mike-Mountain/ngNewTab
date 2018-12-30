export class Bookmark {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  url: string;
  faviconUrl: string;

  constructor(options: any) {
    this.title = options && options.title;
    this.description = options && options.description;
    this.url = options && options.url;
    this.faviconUrl = `${this.url}/favicon.ico`;
  }
}
