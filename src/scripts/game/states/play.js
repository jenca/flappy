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
        flapkey.onDown.add(this.startPipes, this);
        this.input.onDown.add(this.bird.flap, this.bird);
        this.input.onDown.add(this.startPipes, this);

        this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
        this.pipeGenerator.timer.start();

        this.pipes = [];

        //this.jump = this.game.time.events.loop(Phaser.Timer.SECOND * 0.6, function() {this.flap()}, this.bird);
        //this.jump.timer.start();
    },
    update: function() {
        this.game.physics.arcade.collide(this.bird, this.ground);
        if(this.bird.y >= 388 && this.ground._scroll.x == -200) {
            this.stopPipes();
        }
        console.log(this.bird.y)
    },
    generatePipes: function() {
        var pipeY = this.game.rnd.integerInRange(-100, 100);
        var pipeGroup = new PipeGroup(this.game);
        pipeGroup.x = this.game.width;
        pipeGroup.y = pipeY;
        this.pipes.push(pipeGroup);
    },
    stopPipes: function() {
        this.pipeGenerator.timer.stop();
        for(var i = 0; i < this.pipes.length; i++) {
            var pipe = this.pipes[i];
            pipe.setAll('body.velocity.x', 0);
        }
        this.ground.stopScroll();
        console.log('stop');
    },
    startPipes: function() {
        this.pipeGenerator.timer.resume();
        for(var i = 0; i < this.pipes.length; i++) {
            var pipe = this.pipes[i];
            pipe.setAll('body.velocity.x', -200);
        }
        this.ground.autoScroll(-200, 0);
        console.log('start');
    }
}