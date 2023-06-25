import { Schema, type } from "@colyseus/schema";

export class GameRoomState extends Schema {

    @type("number") tick: number = 0;
}
