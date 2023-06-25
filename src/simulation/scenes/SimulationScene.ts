import '@geckos.io/phaser-on-nodejs';
import Phaser from "phaser";
import { GameRoomState } from '../../rooms/schema/GameRoomState';

export class SimulationScene extends Phaser.Scene {

    private state: GameRoomState;

    constructor() {
        super("SimulationScene");
    }

    create(config: { state: GameRoomState }) {
        console.log("simulation started");

        this.state = config.state;
    }

    update() {
        this.state.tick++;
    }
}