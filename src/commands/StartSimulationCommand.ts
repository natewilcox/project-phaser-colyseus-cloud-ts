import '@geckos.io/phaser-on-nodejs';
import Phaser from "phaser";

import { Command } from "@colyseus/command";
import { GameRoom } from "../rooms/GameRoom";
import { SimulationScene } from "../simulation/scenes/SimulationScene";
import ClientService from '../services/ClientService';

type Payload = {
    room: GameRoom,
    CLIENT: ClientService
};

export class StartSimulationCommand extends Command<GameRoom, Payload> {

    async execute({ room, CLIENT }: Payload) {

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
        game.scene.add('SimulationScene', SimulationScene, true, { room, CLIENT });
    }
}