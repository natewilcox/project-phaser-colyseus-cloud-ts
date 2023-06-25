import '@geckos.io/phaser-on-nodejs';
import Phaser from "phaser";
import { GameRoom } from '../../rooms/GameRoom';
import ClientService from '../../services/ClientService';

export class SimulationScene extends Phaser.Scene {

    private room: GameRoom;
    private CLIENT: ClientService;

    constructor() {
        super("SimulationScene");
    }

    create(config: { room: GameRoom, CLIENT: ClientService }) {
        console.log("simulation started");

        this.room = config.room;
        this.CLIENT = config.CLIENT;
        this.CLIENT.onMessage((client, data) => {

            this.CLIENT.sendMessage(client, data);
        });
    }

    update() {
        this.room.state.tick++;
    }
}