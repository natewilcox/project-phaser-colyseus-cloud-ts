import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";
import { BootStrap } from "./scenes/BootStrap";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [BootStrap, GameScene]
};

const game = new Phaser.Game(config);