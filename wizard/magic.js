(function() {
    
    goog.provide('wvsz.Magic');

    goog.require('lime');
    goog.require('lime.animation.KeyframeAnimation');
    goog.require('lime.animation.MoveBy');
    goog.require('lime.Sprite');
    goog.require('goog.math.Coordinate');
    goog.require('goog.math.Vec2');

    var CONST = {
        
    };

    wvsz.Magic = function(game, startPos, targetPos) {
        lime.Sprite.call(this);

        this.game = game;
        this.targetPos = targetPos.clone();

        this.setSize(16,16)
            .setFill("assets/magic.png")
            .setPosition(startPos.clone());
        
        // Add magic to game
        this.game.appendChild(this);
            
        this.fly_();
    }
    goog.inherits(wvsz.Magic, lime.Sprite);
    
    wvsz.Magic.prototype.fly_ = function () {
    
        var delta = goog.math.Coordinate.difference(this.targetPos, this.getPosition()),
            angle = Math.atan2(-delta.y,delta.x),
            degAngle = angle * 180 / Math.PI,
            move = new lime.animation.MoveBy(delta)
            						 .setEasing(lime.animation.Easing.LINEAR)
            						 .setSpeed(1),
            self = this;

        // Rotate object to right direction
        this.setRotation(degAngle);

        // Move sprite
        this.runAction(move);
    }
    
    wvsz.Magic.prototype.destroy = function () {
    	this.game.removeMagic(this);
    }
    
    wvsz.Magic.prototype.step = function (dt) {
    	var zombie = this.game.zombie;
    	
    	// Check collision with zombie
    	if (goog.math.Box.intersects(this.getBoundingBox(), zombie.getBoundingBox())) {
    		//zombie.wasShot(this);
            //this.destroy();
        }
        
        // Magic out of box
        if (goog.math.Box.intersects(this.game.getBoundingBox(), this.getBoundingBox())) {
        	//this.destroy();
        }
    }
    
})();