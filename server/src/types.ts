import Room from "./Room";

export type JoinRoomCallback = (room?: Room, username?: string) => void;
export type PlayVideoData = { time: number; roomId: string };
export type PauseVideoData = { time: number; roomId: string };
export type ChangeVideoData = { videoId: string; roomId: string };
