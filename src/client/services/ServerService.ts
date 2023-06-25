import * as Colyseus from "colyseus.js";
import type { GameRoomState } from "../../rooms/schema/GameRoomState";

export enum ServerEvents {
    OnStateChange = 'onstatechange'
}

export default class ServerService {

    private room: Colyseus.Room<GameRoomState>;
    private client: Colyseus.Client;

    private serverEvents: Phaser.Events.EventEmitter;

    constructor(serverUrl: string) {

        this.client = new Colyseus.Client(serverUrl);
        this.serverEvents = new Phaser.Events.EventEmitter();
    }

    async joinRoom(roomName: string) {

        try {

            this.room = await this.client.joinOrCreate<GameRoomState>(roomName);
            console.log(this.room.sessionId, "joined", this.room.name);

            this.room.onStateChange(state => {
                this.serverEvents.emit(ServerEvents.OnStateChange, state);
            });

        }
        catch(e) {
            console.log("JOIN ERROR", e);
        }

    }

    onStateChange(cb: (state: GameRoomState) => void, context?: any) {
        this.serverEvents.on(ServerEvents.OnStateChange, cb, context);
    }
}