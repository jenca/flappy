'use strict';

function Boot() {
}

Boot.prototype = {
    preload: function() {
        this.load.image('preloader', 'assets/preloader.gif');
    },
    create: function() {
        this.game.input.macPointers = 1;
        this.game.state.start('preload');
    }
};

