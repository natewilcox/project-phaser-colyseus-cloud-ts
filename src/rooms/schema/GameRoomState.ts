import { ArraySchema, Schema, type } from "@colyseus/schema";
import { ServerObjectState } from "./ServerObjectState";

export class GameRoomState extends Schema {

    @type([ServerObjectState])
    serverObjects: ArraySchema<ServerObjectState> = new ArraySchema<ServerObjectState>();
}
