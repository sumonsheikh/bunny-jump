
import Phaser  from "../lib/phaser.js";
import Carrot  from "../game/Carrot.js";
export default class Game extends Phaser.Scene{
    /** @type {Phaser.Physics.Arcade.Sprite} */
    platforms

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursore
    constructor(){
        
        
        super('Game')
    }
    preload(){
        this.load.image('background','assets/bg_layer1.png');
        this.load.image('platform','assets/ground_grass.png');
        this.load.image('bunny-stand', 'assets/bunny1_stand.png')
        this.cursore = this.input.keyboard.createCursorKeys();

        this.load.image('carrot','assets/carrot.png');
    }

    create(){
        this.add.image(240,320,'background').setScrollFactor(1,0);
        //instead of this 
        //this.add.image(240,320,'platform').setScale(0.5);
        //use this
        //remove this
        //this.physics.add.image(240,320,'platform').setScale(0.5);
        
        this.platforms = this.physics.add.staticGroup();
        for(let i = 0; i < 5; ++i){
            const x = Phaser.Math.Between(80,400);
            const y = 150*i;
            const platform = this.platforms.create(x,y,'platform');
            platform.scale = 0.5;
            const body = platform.body;
            body.updateFromGameObject();
        }
         this.player = this.physics.add.sprite(240,320,'bunny-stand').setScale(0.5);
        this.physics.add.collider(this.platforms, this.player);
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;
        this.player.body.checkCollision.up = false;
        this.cameras.main.startFollow(this.player);
        //set dead zone horizontaly 
        this.cameras.main.setDeadzone(this.scale.width * 1.5);

        //create carrot class
        const carrot = new Carrot(this, 240, 320,'carrot');
        this.add.existing(carrot);
    }
    update(t, dt){

        const touchingDown = this.player.body.touching.down;

        if(touchingDown){
            this.player.setVelocityY(-300);
        }
        if(this.cursore.left.isDown && !touchingDown){
            this.player.setVelocityX(-200);
        }else if(this.cursore.right.isDown && !touchingDown){
            this.player.setVelocityX(200);
        }else{
            this.player.setVelocityX(0);
        }
        this.platforms.children.iterate(child =>{
            const platform = child;
            

            const scrollY = this.cameras.main.scrollY;
          

            if(platform.y >= scrollY+700){
                platform.y = scrollY- Phaser.Math.Between(50,100);
                console.log("update platformY: " + platform.y);
                platform.body.updateFromGameObject();
            }
        })
        this.horizontalWrap(this.player)
        
    }
    horizontalWrap(sprite){
        const halfWidth = sprite.displayWidth * 0.5;
        const gameWidth = this.scale.width;
        if(sprite.x < -halfWidth){
            sprite.x = gameWidth + halfWidth;
        }else if(sprite.x > gameWidth + halfWidth){
            sprite.x = -halfWidth;
        }
    }
}