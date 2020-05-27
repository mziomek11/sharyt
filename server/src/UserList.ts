import User from "./User";

class UserList {
  users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  removeUser(id: string) {
    this.users = this.users.filter((user) => user.id === id);
  }

  getUser(id: string): User | null {
    const user = this.users.find((user) => user.id === id);

    return user ? user : null;
  }
}

export default UserList;
