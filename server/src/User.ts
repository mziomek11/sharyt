class User {
  constructor(
    private id: string,
    private username: string,
    private room: string
  ) {}

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getRoom(): string {
    return this.room;
  }
}

export default User;
