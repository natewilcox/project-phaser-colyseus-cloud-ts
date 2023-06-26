import '@geckos.io/phaser-on-nodejs';
import Phaser from "phaser";
import { GameRoom } from '../../rooms/GameRoom';
import ClientService from '../../services/ClientService';
import { ServerObjectState } from '../../rooms/schema/ServerObjectState';

export class SimulationScene extends Phaser.Scene {

    private serverObjects: Phaser.Physics.Arcade.Group;

    private room: GameRoom;
    private CLIENT: ClientService;

    constructor() {
        super("SimulationScene");
    }

    preload() {

        this.serverObjects = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite
        });
    }

    create(config: { room: GameRoom, CLIENT: ClientService }) {
        console.log("simulation started");

        this.physics.world.setBoundsCollision(true, true, true, true);

        this.room = config.room;
        this.CLIENT = config.CLIENT;
        this.CLIENT.onMessage((client, data) => {
            this.CLIENT.sendMessage(client, data);
        });
    
        // demo of creating a server object synced to client
        const demoServerObject = new ServerObjectState(100, 0);
        this.room.state.serverObjects.push(demoServerObject);
        
        const serverObject: Phaser.Physics.Arcade.Sprite = this.serverObjects.get(demoServerObject.x, demoServerObject.y);
        serverObject.setCollideWorldBounds(true);
        serverObject.setDataEnabled();
        serverObject.setData("syncedState", demoServerObject);
        serverObject.setSize(100, 100);
        serverObject.setOrigin(0.5, 0.5);
        this.events.on(Phaser.Scenes.Events.POST_UPDATE, this.postUpdate);
    }

    update() {
    }

    private postUpdate = () => {

        this.serverObjects.getChildren().forEach((gameObject) => {
            
            const serverObject = gameObject as Phaser.Physics.Arcade.Sprite;
            const serverObjectState: ServerObjectState = serverObject.getData("syncedState");
            serverObjectState.x = serverObject.x
            serverObjectState.y = serverObject.y;
        });
      }
}