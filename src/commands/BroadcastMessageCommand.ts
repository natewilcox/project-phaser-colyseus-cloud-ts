import { Command } from "@colyseus/command";
import { GameRoom } from "../rooms/GameRoom";
import { ServerMessages } from '../types/ServerMessages';

type Payload = {
    client: any,
    msg: any
};

export class BroadcastMessageCommand extends Command<GameRoom, Payload> {

    async execute({ client, msg }: Payload) {
        console.log(`broadcasting '${msg}' from ${client.id}`);
        this.room.broadcast(ServerMessages.SendMessage, msg);
    }
}