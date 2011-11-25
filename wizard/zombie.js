(function() {

    goog.provide('wvsz.Zombie');

    goog.require("lime.ASSETS.zombie.plist");
    goog.require('lime.Sprite');
    goog.require('lime.SpriteSheet');
    goog.require('lime.animation.KeyframeAnimation');
    goog.require('lime.parser.ZWOPTEX');

    var CONST = {
        ACTION_MOVE: "moving",
        ACTION_DIE: "die"
    };
    
    function angleBetweenTwoVec2(vec1, vec2){
    	var angle = Math.acos((vec1.x * vec2.x + vec1.y * vec2.y) / ( Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y)
                    * Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y) ));
        return angle * 180 / Math.PI;
    }

    wvsz.Zombie = function(game) {
        lime.Sprite.call(this);

        this.game = game;
        this.spriteSheet = new lime.SpriteSheet('assets/zombie.png',lime.ASSETS.zombie.plist, lime.parser.ZWOPTEX);
        this.SPEED = .10;
        this.baseVec = new goog.math.Vec2(1, 0);

        this.status = CONST.ACTION_MOVE;

        this.setSize(32,32).setFill(this.spriteSheet.getFrame('zombie01.png'));
        
        this.start();
    }
    goog.inherits(wvsz.Zombie, lime.Sprite);
    
    wvsz.Zombie.prototype.start = function (dt) {
        lime.scheduleManager.schedule(this.step_, this);
        var negativeX = Math.random() >= 0.5 ? -10 : 10,
        	negativeY = Math.random() >= 0.5 ? -10 : 10,
        	randomeX = Math.ceil(Math.random() * negativeX),
        	randomeY = Math.ceil(Math.random() * negativeY);
    	this.v = new goog.math.Vec2(randomeX, randomeY).normalize();
		var angle = Math.atan2(-this.v.y,this.v.x),
            degAngle = angle * 180 / Math.PI;
            
        // rotate zombie
        this.setRotation(degAngle);

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
        	size = this.game.getSize(),
        	isCollisionWithWall = false;
        	degAngle = null,
        	angle = null;

        if (this.status === CONST.ACTION_MOVE) {
            pos.x += this.v.x * dt * this.SPEED;
            pos.y += this.v.y * dt * this.SPEED;
            if (pos.x >= 480 || pos.x <= 0) {
                // collision with right or left wall
                if (pos.x >= 480 && ((this.v.x > 0 && this.v.y > 0) || (this.v.x >= 0 && this.v.y < 0))) {
                	// Right
                	this.v.x *= -1;
                	isCollisionWithWall = true;
                } else if (pos.x <= 0 && ((this.v.x < 0 && this.v.y < 0) || (this.v.x <= 0 && this.v.y >= 0))) {
                	// Left
                	this.v.x *= -1;
                	isCollisionWithWall = true;
                }
            } else if (pos.y >= 360 || pos.y <= 0) {
                // collision with top or bottom wall
                if (pos.y >= 360 && ((this.v.x < 0 && this.v.y > 0) || (this.v.x >= 0 && this.v.y > 0))) {
                	// Bottom
                	this.v.y *= -1;
                	isCollisionWithWall = true;
                	
                } else if (pos.y <= 0 && ((this.v.x > 0 && this.v.y < 0) || (this.v.x <= 0 && this.v.y < 0))) {
                	// Top
                	this.v.y *= -1;
                	isCollisionWithWall = true;
                }
            }
            
            if (isCollisionWithWall) {
            	angle = Math.atan2(-this.v.y,this.v.x);
            	degAngle = angle * 180 / Math.PI;
            	this.setRotation(degAngle);
            }

            this.setPosition(pos);
        }
    }
    
    wvsz.Zombie.prototype.wasShot = function (magic) {
        var anim = new lime.animation.KeyframeAnimation(),
        	self = this,
        	game = this.game;
        
        // Change sprite
        anim.setDelay(1 / 12)
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

        // Change status
        this.status = CONST.ACTION_DIE;
    }

    wvsz.Zombie.prototype.changeStatus = function (status) {
        this.status = status;
    }

})();