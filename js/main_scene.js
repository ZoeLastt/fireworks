
class main_scene extends Phaser.Scene{

    constructor(){

        super('main_scene');

    }

    preload(){

        this.load.spritesheet('firework', 'images/spritesheet.png',{frameWidth: 256, frameHeight: 256});
        this.load.image('background', 'images/bg.png');

    }

    create(){

        this.cameras.main.setBackgroundColor('13294d'); //background colour of scene 
        this.add.image(300, 300, 'background');

        this.anims.create({

            key: 'takeoff',
            frames: this.anims.generateFrameNumbers('firework', {frames:[0, 1, 2]}),
            frameRate: 10

        });
        this.anims.create({

            key: 'explosion',
            frames: this.anims.generateFrameNumbers('firework', {frames:[3, 4, 5, 6]}),
            frameRate: 10

        });

        this.input.on('pointerdown', ()=>{

            target_location.x = this.input.mousePointer.worldX;
            target_location.y = this.input.mousePointer.worldY;

            this.spawn_firwork(target_location.x, target_location.y);
            //add some feedback for user to know that firework cannot be close to world border, sound, camera shakes etc
            
        });
    }

    update(){

        if(num > 0){
            for(let i = 0; num; i++){

                const child = firework_group.getChildren()[i];
                let distance = Phaser.Math.Distance.Between(child.x, child.y, target_location.x, target_location.y);

                if(distance > 10){

                    this.physics.moveToObject(child, target_location, 300);

                }else{

                    child.setVelocity(0);

                }
                num = 0;
            } 
        }
    }

    spawn_firwork(a, b){
        
        num +=1;

        firework_group = this.physics.add.group({

            key: 'firework'

        });
        firework_group.children.iterate(function (child) {

            child.x = 300; child.y = 595;
            const angle = Phaser.Math.Angle.Between(child.x, child.y, target_location.x, target_location.y);

            child.setRotation(angle + Math.PI/2)
            .setScale(Phaser.Math.FloatBetween(0.3, 0.6))
            .setTint(Phaser.Math.RND.pick(['0xeb34e1', '0x37eb34', '0xffff00', '0xffa2c3']))
            .play({key: 'takeoff', repeat: Phaser.Math.Between(1, 3)})
            .on(Phaser.Animations.Events.ANIMATION_COMPLETE, function(){

                child.play({key: 'explosion', repeat: 0});
                child.setVelocity(0, 0);

            })
            .on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'explosion', function(){ //specific animation complete

                child.destroy();

            });
        });
    }
}