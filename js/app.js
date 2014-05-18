"use strict";function Boot(){console.log("WTF")}Boot.prototype={preload:function(){this.load.image("preloader","assets/preloader.gif")},create:function(){this.game.input.maxPointers=1,this.game.state.start("preload")}};
"use strict";function Preload(){this.asset=null,this.ready=!1}Preload.prototype={preload:function(){this.asset=this.add.sprite(this.width/2,this.height/2,"preloader"),this.asset.anchor.setTo(.5,.5),this.load.onLoadComplete.addOnce(this.onLoadComplete,this),this.load.setPreloadSprite(this.asset),this.load.image("background","assets/background.png"),this.load.image("ground","assets/ground.png"),this.load.image("title","assets/title.png"),this.load.image("startButton","assets/start-button.png"),this.load.image("poop","assets/poop.png"),this.load.spritesheet("bird","assets/bird.png",34,24,3)},create:function(){this.asset.cropEnabled=!1},update:function(){this.ready&&this.game.state.start("play")},onLoadComplete:function(){this.ready=!0}};
"use strict";var Bird=function(t,i,r,a){Phaser.Sprite.call(this,t,i,r,"bird",a),this.anchor.setTo(.5,.5),this.animations.add("flap"),this.animations.play("flap",12,!0),this.game.physics.arcade.enableBody(this)};Bird.prototype=Object.create(Phaser.Sprite.prototype),Bird.prototype.constructor=Bird,Bird.prototype.update=function(){};
"use strict";var Ground=function(t,o,r,e,i){Phaser.TileSprite.call(this,t,o,r,e,i,"ground"),this.autoScroll(-200,0),this.game.physics.arcade.enableBody(this),this.body.allowGravity=!1,this.body.immovable=!0};Ground.prototype=Object.create(Phaser.TileSprite.prototype),Ground.prototype.constructor=Ground,Ground.prototype.update=function(){};
"use strict";function Menu(){}Menu.prototype={preload:function(){},create:function(){this.background=this.game.add.sprite(0,0,"background"),this.ground=this.game.add.tileSprite(0,400,335,112,"ground"),this.ground.autoScroll(-200,0),this.title=this.game.add.sprite(0,0,"title"),this.bird=this.game.add.sprite(200,5,"bird"),this.bird.animations.add("flap",[0,1,2,1]),this.bird.animations.play("flap",15,!0),this.titleGroup=this.game.add.group(),this.titleGroup.add(this.title),this.titleGroup.add(this.bird),this.titleGroup.x=30,this.titleGroup.y=100,this.game.add.tween(this.titleGroup).to({y:115},350,Phaser.Easing.Linear.NONE,!0,0,1e3,!0),this.startButton=this.game.add.button(this.game.width/2,300,"startButton",this.startClick,this),this.startButton.anchor.setTo(.5,.5)},update:function(){},startClick:function(){this.game.state.start("play")}};
"use strict";function Play(){}Play.prototype={create:function(){this.game.physics.startSystem(Phaser.Physics.ARCADE),this.game.physics.arcade.gravity.y=500,this.background=this.game.add.sprite(0,0,"background"),this.bird=new Bird(this.game,100,this.game.height/2),this.game.add.existing(this.bird),this.ground=new Ground(this.game,0,400,335,112),this.game.add.existing(this.ground)},update:function(){this.game.physics.arcade.collide(this.bird,this.ground)}};
"use strict";var game=new Phaser.Game(288,505,Phaser.AUTO,"game");game.state.add("boot",Boot),game.state.add("preload",Preload),game.state.add("menu",Menu),game.state.add("play",Play),game.state.start("boot");