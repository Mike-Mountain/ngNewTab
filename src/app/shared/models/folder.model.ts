export class Folder {
  _id?: string;
  userId: string;
  folderFor: string;
  name: string;
  itemIds: Array<string>;
  description?: string;
  created: Date;
  iconUrl?: string;

  constructor(options: any) {
    this.userId = options && options.userId;
    this.folderFor = options && options.folderFor;
    this.name = options && options.name;
    this.itemIds = options && options.itemIds || [];
    this.description = options && options.description;
    this.created = new Date();
    this.iconUrl = options && options.iconUrl;
  }
}
