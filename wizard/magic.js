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
        this.delta = goog.math.Coordinate.difference(this.targetPos, this.getPosition());
        this.SPEED = .20;
            
        this.fly_();
    }
    goog.inherits(wvsz.Magic, lime.Sprite);
    
    wvsz.Magic.prototype.fly_ = function () {
    
        var delta = goog.math.Coordinate.difference(this.targetPos, this.getPosition()),
            angle = Math.atan2(-delta.y,delta.x),
            degAngle = angle * 180 / Math.PI,
            self = this;

        // Rotate object to right direction
        this.setRotation(degAngle);
        
        this.v = goog.math.Vec2.fromCoordinate(delta).normalize();

        // Move sprite
        lime.scheduleManager.schedule(this.step, this);
    }
    
    wvsz.Magic.prototype.destroy = function () {
    	this.game.removeMagic(this);
    }
    
    wvsz.Magic.prototype.step = function (dt) {
    	var zombies = this.game.zombies,
    		lenZombies = zombies.length,
    		zombie = null;
    	
    	// Check collision with zombies
    	if (lenZombies > 0) {
			for (var i = lenZombies - 1; i >= 0; i--) {
				zombie = zombies[i];
				if (zombie && goog.math.Box.intersects(this.getBoundingBox(), zombie.getBoundingBox())) {
					zombie.wasShot(this);
					this.destroy();
				}
			}
    	}
    	
        
        // Magic out of box
        if (!goog.math.Box.intersects(this.game.getBoundingBox(), this.getBoundingBox())) {
        	this.destroy();
        }
        
        // Update position
        var pos = this.getPosition();
		pos.x += this.v.x * dt * this.SPEED;
		pos.y += this.v.y * dt * this.SPEED;
		
		this.setPosition(pos);
    }

})();