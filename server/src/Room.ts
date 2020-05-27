import { v4 as uuidv4 } from "uuid";

const defualtVideoId = "2g811Eo7K8U";

class Room {
  id: string;
  videoId: string;

  constructor() {
    this.id = uuidv4();
    this.videoId = defualtVideoId;
  }
}

export default Room;
