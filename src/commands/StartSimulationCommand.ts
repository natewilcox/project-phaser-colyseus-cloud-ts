import '@geckos.io/phaser-on-nodejs';
import Phaser from "phaser";

import { Command } from "@colyseus/command";
import { MyRoom } from "../rooms/GameRoom";
import { SimulationScene } from "../simulation/scenes/SimulationScene";
import { GameRoomState } from '../rooms/schema/GameRoomState';

type Payload = {
    state: GameRoomState
};

export class StartSimulationCommand extends Command<MyRoom, Payload> {

    async execute({ state }: Payload) {

        const FPS = 1;
        const config = {
            type: Phaser.HEADLESS,
            width: 1280,
            height: 720,
            fps: {
                target: FPS,
                forceSetTimeOut: true
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            }
        }

        console.log("Starting simluation scene");
        const game = new Phaser.Game(config);
        game.scene.add('SimulationScene', SimulationScene, true, { state });
    }
}