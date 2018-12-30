export class User {
  _id?: string;
  username: string;
  email: string;
  roles: Array<string>;

  constructor(options: any) {
    this._id = options && options._id;
    this.username = options && options.username;
    this.email = options && options.email;
    this.roles = options && options.roles;
  }
}
