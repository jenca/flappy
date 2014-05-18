'use strict';

function Play() { }

Play.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 500;

        this.background = this.game.add.sprite(0, 0, 'background');

        this.bird = new Bird(this.game, 100, this.game.height/2);
        this.game.add.existing(this.bird);

        this.ground = new Ground(this.game, 0, 400, 335, 112);
        this.game.add.existing(this.ground);
    },
    update: function() {
        this.game.physics.arcade.collide(this.bird, this.ground);
    }
}