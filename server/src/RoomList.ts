import Room from "./Room";

class RoomList {
  rooms: Room[] = [];

  addRoom(room: Room) {
    this.rooms.push(room);
  }

  removeRoom(id: string) {
    this.rooms = this.rooms.filter((room) => room.id !== id);
  }

  getRoom(id: string): Room | null {
    const room = this.rooms.find((r) => r.id === id);

    return room ? room : null;
  }
}

export default RoomList;
