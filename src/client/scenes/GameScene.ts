import type { GameRoomState } from "../../rooms/schema/GameRoomState";
import ServerService from "../services/ServerService";

export class GameScene extends Phaser.Scene
{
    private SERVER: ServerService;

    constructor () {
        super('game');
    }

    preload () {
       
    }

    async create (config: { SERVER: ServerService }) {
        
        this.SERVER = config.SERVER;
        this.SERVER.joinRoom('my_room');

        let text = this.add.text(100, 100, 'tick: ');

        this.SERVER.onStateChange((state: GameRoomState) => {
            text.setText('tick: ' + state.tick);

            if(state.tick % 10 == 0) {
                this.SERVER.sendMessage({ msg: "Hello", broadcast: true });
            }
        });

        this.SERVER.onMessage(msg => console.log(msg));
    }
}