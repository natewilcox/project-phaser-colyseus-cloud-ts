import { Command } from "@colyseus/command";
import { GameRoom } from "../rooms/GameRoom";
import { ServerMessages } from '../types/ServerMessages';

type Payload = {
    client: any,
    msg: any
};

export class ProcessMessageCommand extends Command<GameRoom, Payload> {

    async execute({ client, msg }: Payload) {
        console.log(`processing message from ${client.id}`);
        console.dir(msg);
        
        if(msg.broadcast) {
            console.log("broadcasting");
            this.room.broadcast(ServerMessages.SendMessage, msg);
        }
    }
}