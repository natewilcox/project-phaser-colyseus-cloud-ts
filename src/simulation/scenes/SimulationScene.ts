import '@geckos.io/phaser-on-nodejs';
import Phaser from "phaser";
import { GameRoom } from '../../rooms/GameRoom';

export class SimulationScene extends Phaser.Scene {

    private room: GameRoom;

    constructor() {
        super("SimulationScene");
    }

    create(config: { room: GameRoom }) {
        console.log("simulation started");
        this.room = config.room;
    }

    update() {
        this.room.state.tick++;
    }
}