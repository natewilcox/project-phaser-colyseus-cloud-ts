import { Room, Client } from "@colyseus/core";
import { GameRoomState } from "./schema/GameRoomState";
import { Dispatcher } from "@colyseus/command";
import ClientService from "../services/ClientService";
import { SimulationScene } from "../simulation/scenes/SimulationScene";

export class GameRoom extends Room<GameRoomState> {
  
    game: Phaser.Game;
    maxClients = 4;
    dispatcher: Dispatcher<GameRoom> = new Dispatcher(this);

    onCreate (options: any) {
        console.info("Room created");
        
        this.setState(new GameRoomState());

        const FPS = 30;
        const config = {
            type: Phaser.HEADLESS,
            width: 800,
            height: 600,
            fps: {
                target: FPS,
                forceSetTimeOut: true
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 100, x: 20 }
                }
            }
        }

        console.log("Starting simluation scene");
        this.game = new Phaser.Game(config);
        this.game.scene.add('SimulationScene', SimulationScene, true, { room: this, CLIENT: new ClientService(this) });
    }

    onJoin (client: Client, options: any) {
        console.log(client.sessionId, "joined!");
    }

    onLeave (client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
        this.game.destroy(false);
    }
}
