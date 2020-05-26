import User from "./User";

class UserList {
  users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  removeUser(userId: string) {
    this.users = this.users.filter((user) => user.getId() === userId);
  }

  getUser(userId: string): User | null {
    const user = this.users.find((user) => user.getId() === userId);

    return user ? user : null;
  }
}

export default UserList;
