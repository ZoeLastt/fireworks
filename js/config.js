
const target_location = new Phaser.Math.Vector2();
let firework_group;
let num = 0;

window.onload = function(){

    const config = {
        type: Phaser.WEBGL,
        width: 600,
        height: 600,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        physics: {
        default: 'arcade', 
        arcade: {
        gravity: { y: 0 },
        debug: false
        }
        },
        scene: [main_scene]
    }; 
    
    const game = new Phaser.Game(config);

}