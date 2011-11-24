(function() {

    goog.provide('wvsz.Zombie');

    goog.require("lime.ASSETS.zombie.plist");
    goog.require('lime.Sprite');
    goog.require('lime.SpriteSheet');
    goog.require('lime.animation.KeyframeAnimation');

    wvsz.Zombie = function(game) {
        lime.Sprite.call(this);

        this.game = game;
        this.spriteSheet = new lime.SpriteSheet('assets/zombie.png',lime.ASSETS.zombie.plist);
        this.SPEED = .10;

        this.setSize(32,32).setFill(this.spriteSheet.getFrame('zombie01.png'));
    }
    goog.inherits(wvsz.Zombie, lime.Sprite);
    
    wvsz.Zombie.prototype.start = function (dt) {
        lime.scheduleManager.schedule(this.step_, this);
        var negative = Math.random() === 0 ? -.5 : .5;
    	this.v = new goog.math.Vec2(Math.random() * negative, Math.random() * negative).normalize();
    	
    	// Walking animation
    	var anim = new lime.animation.KeyframeAnimation();
    	anim.setDelay(1 / 6)
        	.setLooping(true);
        	
        for(var i = 1; i <= 2; i++){
           anim.addFrame(this.spriteSheet.getFrame('zombie' + '0' + i + '.png'));
        }
        this.runAction(anim);
    }

    wvsz.Zombie.prototype.step_ = function (dt) {
        var pos = this.getPosition(), 
        	size = this.game.getSize();
        	
		pos.x += this.v.x * dt * this.SPEED;
		pos.y += this.v.y * dt * this.SPEED;
		
		this.setPosition(pos);
    }
    
    wvsz.Zombie.prototype.wasShot = function (magic) {
        var anim = new lime.animation.KeyframeAnimation(),
        	self = this,
        	game = this.game;
        
        // Change sprite
        anim.setDelay(1 / 6)
        	.setLooping(false);
        	
        for(var i = 3; i <= 6; i++){
           anim.addFrame(this.spriteSheet.getFrame('zombie' + '0' + i + '.png'));
        }
        this.runAction(anim);
        
        // on stop show front facing
        goog.events.listen(anim, lime.animation.Event.STOP,function(){
            game.wizard.unlockTarget();
            game.killZombie(self);
        });
    }

})();