import { Room, Client } from "@colyseus/core";
import { GameRoomState } from "./schema/GameRoomState";
import { Dispatcher } from "@colyseus/command";
import { StartSimulationCommand } from "../commands/StartSimulationCommand";
import ClientService from "../services/ClientService";

export class GameRoom extends Room<GameRoomState> {
  
    maxClients = 4;
    dispatcher: Dispatcher<GameRoom> = new Dispatcher(this);

    onCreate (options: any) {
        console.info("Room created");
        
        this.setState(new GameRoomState());
        this.dispatcher.dispatch(new StartSimulationCommand(), { room: this, CLIENT: new ClientService(this) });
    }

    onJoin (client: Client, options: any) {
        console.log(client.sessionId, "joined!");
    }

    onLeave (client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
