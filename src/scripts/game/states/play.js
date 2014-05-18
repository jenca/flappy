'use strict';

function Play() { }

Play.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1200;

        this.background = this.game.add.sprite(0, 0, 'background');

        this.bird = new Bird(this.game, 100, this.game.height/2);
        this.game.add.existing(this.bird);

        this.ground = new Ground(this.game, 0, 400, 335, 112);
        this.game.add.existing(this.ground);

        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        var flapkey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        flapkey.onDown.add(this.bird.flap, this.bird);
        this.input.onDown.add(this.bird.flap, this.bird);
    },
    update: function() {
        this.game.physics.arcade.collide(this.bird, this.ground);
    }
}