'use strict';

function Play() { }

Play.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 500;
        this.background = this.game.add.sprite(0, 0, 'background');
        this.button = this.game.add.button(
            this.game.world.centerX,
            this.game.world.centerY,
            'startButton', this.explode, this);
        this.button.anchor.setTo(0.5, 0.5);

    },
    update: function() {

    },
    explode: function() {
        var birdGroup = this.game.add.group();
        for (var i = 0; i < 9; i++) {
            var bird = new Bird(this.game, this.game.world.centerX, this.game.world.centerY);
            bird.body.velocity.x = (Math.random()*2-1)*120;
            bird.body.velocity.y = Math.random()*-700;
            birdGroup.add(bird);
        }
    }
}