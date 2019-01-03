export interface Bookmark {
  _id?: string;
  userId: string;
  title: string;
  description?: string;
  url: string;
  faviconUrl: string;
}
