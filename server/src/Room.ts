import shortid from "shortid";

const defualtVideoId = "2g811Eo7K8U";

class Room {
  id: string;
  videoId: string;

  constructor() {
    this.id = shortid();
    this.videoId = defualtVideoId;
  }
}

export default Room;
