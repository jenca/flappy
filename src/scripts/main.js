'use strict';

var game = new Phaser.Game(288, 505, Phaser.AUTO, 'game');

// Game States
game.state.add('boot', new Boot());
game.state.add('preload', new Preload());

game.state.start('boot');


