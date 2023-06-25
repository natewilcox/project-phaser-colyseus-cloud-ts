import { Command } from "@colyseus/command";
import { GameRoom } from "../rooms/GameRoom";
import { ServerMessages } from '../types/ServerMessages';

type Payload = {
    client: any,
    msg: any
};

export class SendMessageCommand extends Command<GameRoom, Payload> {

    async execute({ client, msg }: Payload) {

        if(msg.broadcast) {

            console.log(`broadcasting msg from ${client.id}`);
            console.dir(msg);
            
            this.room.broadcast(ServerMessages.SendMessage, msg);
        }
    }
}