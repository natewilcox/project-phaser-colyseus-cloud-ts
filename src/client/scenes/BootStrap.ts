import ServerService from "../services/ServerService";

export class BootStrap extends Phaser.Scene
{
    private SERVER: ServerService;

    constructor () {
        super('bootstrap');

        this.SERVER = new ServerService('ws://localhost:2567');
    }

    preload () {
    
    }

    create () {
        
        this.scene.launch('game', {
            SERVER: this.SERVER
        });
    }
}