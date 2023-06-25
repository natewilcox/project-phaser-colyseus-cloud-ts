import { GameRoom } from "../rooms/GameRoom";
import { SendMessageCommand } from "../commands/SendMessageCommand";
import { ClientMessages } from "../types/ClientMessages";

export default class ClientService {

    private room: GameRoom;
    
    constructor(room: GameRoom) {
        this.room = room;
    }

    sendMessage(client: any, msg: any) {
        this.room.dispatcher.dispatch(new SendMessageCommand(), { client, msg });
    }

    onMessage(cb: (client: any, data: any) => void) {

        this.room.onMessage(ClientMessages.SendMessage, (client, data) => {
            console.log(`recieved message from ${client.id}`);
            console.dir(data);

            cb(client, data);
        });
    }
}