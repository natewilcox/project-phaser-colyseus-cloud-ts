import { GameRoom } from "../rooms/GameRoom";
import { BroadcastMessageCommand } from "../commands/BroadcastMessageCommand";
import { ClientMessages } from "../types/ClientMessages";

export default class ClientService {

    private room: GameRoom;
    
    constructor(room: GameRoom) {
        this.room = room;
    }

    broadcast(client: any, msg: string) {
        this.room.dispatcher.dispatch(new BroadcastMessageCommand(), { client, msg });
    }

    onMessage(cb: (client: any, data: any) => void) {

        this.room.onMessage(ClientMessages.SendMessage, (client, data) => {
            console.log(`recieved message from ${client.id}`);
            console.dir(data);

            cb(client, data);
        });
    }
}