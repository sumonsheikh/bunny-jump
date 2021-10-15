
import Phaser  from "../lib/phaser.js";
console.dir(Phaser.Scene)
export default class Game extends Phaser.Scene{
    constructor(){
        /** @type {Phaser.Physics.Arcade.Sprite} */
        
        super('Game')
    }
    preload(){
        this.load.image('background','assets/bg_layer1.png');
        this.load.image('platform','assets/ground_grass.png');
        this.load.image('bunny-stand', 'assets/bunny1_stand.png')

    }

    create(){
        this.add.image(240,320,'background');
        //instead of this 
        //this.add.image(240,320,'platform').setScale(0.5);
        //use this
        //remove this
        //this.physics.add.image(240,320,'platform').setScale(0.5);

        const platforms = this.physics.add.staticGroup();
        for(let i = 0; i < 5; ++i){
            const x = Phaser.Math.Between(80,400);
            const y = 150*i;
            const platform = platforms.create(x,y,'platform');
            platform.scale = 0.5;
            const body = platform.body;
            body.updateFromGameObject();
        }
         this.player = this.physics.add.sprite(240,320,'bunny-stand').setScale(0.5);
        this.physics.add.collider(platforms, this.player);
    }
    update(){

        const touchingDown = this.player.body.touching.down;

        if(touchingDown){
            this.player.setVelocityY(-300);
        }
    }
}