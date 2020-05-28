import shortid from "shortid";

class Message {
  id: string;

  constructor(public author: string, public content: string) {
    this.id = shortid();
  }
}

export default Message;
