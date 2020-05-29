import shortid from "shortid";

class Message {
  id: string;
  sendTime: number;

  constructor(public author: string, public content: string) {
    this.id = shortid();
    this.sendTime = Date.now();
  }
}

export default Message;
