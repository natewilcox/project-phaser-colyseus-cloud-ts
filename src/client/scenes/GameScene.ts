import ServerService from "../services/ServerService";

export class GameScene extends Phaser.Scene
{
    serverObjects: Phaser.Physics.Arcade.Group;

    private SERVER: ServerService;

    constructor () {
        super('game');
    }

    preload () {
        this.load.image("ball", "images/ball.png");
    }

    async create (config: { SERVER: ServerService }) {
        
        this.physics.world.setBoundsCollision(true, true, true, true);

        this.serverObjects = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite
        });

        try {

            this.SERVER = config.SERVER;
            const state = await this.SERVER.joinRoom('my_room');
    
            // DEMO of initial state syncrhonization
            state.serverObjects.onAdd((serverObject, key) => {

                const serverObjectSprite: Phaser.Physics.Arcade.Sprite = this.serverObjects.get(serverObject.x, serverObject.y);
                serverObjectSprite.setSize(100, 100);
                serverObjectSprite.setCollideWorldBounds(true);
                //serverObjectSprite.setScale(0.5, 0.5);

                serverObject.onChange((changes) => {
                    changes.forEach(change => {
                       
                        let x = serverObjectSprite.getCenter().x;
                        let y = serverObjectSprite.getCenter().y;

                        switch(change.field) {

                            case "x": 
                                x = change.value;
                                break;

                            case "y": 
                                y = change.value;
                                break;
                        }

                        serverObjectSprite.setPosition(x, y);
                    });
                });
            });

            this.SERVER.onStateChange((state) => {
                //console.log("room state changed");
            });

            this.SERVER.onMessage(msg => console.log(msg));
        }
        catch(e) {
            console.error("unable to start game scene", e);
        }
    }
}