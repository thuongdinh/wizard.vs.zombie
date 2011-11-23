(function() {
    
    goog.provide('wvsz.Game');

    goog.require('lime');
    goog.require('lime.animation.KeyframeAnimation');
    goog.require('lime.animation.MoveBy');
    goog.require('lime.Scene');
    goog.require('goog.math.Coordinate');
    goog.require('goog.array');

    var CONST = {
        
    };

    wvsz.Game = function(director) {
        lime.Scene.call(this);
        
        this.director = director;
        this.wizard = null;
        this.zombie = null;
        this.magics = [];
        this.level = new wvsz.Level(this);
        
        this.level.initEntities();
    }
    goog.inherits(wvsz.Game, lime.Scene);
    
    wvsz.Game.prototype.start = function () {
    	var self = this,
    		wizard = self.wizard,
    		zombie = self.zombie;
    	
    	goog.events.listen(this,['mousedown','touchstart'],function(e){
        
        	wizard.moteToPosition(e.position);

    	});
    	
    	// Start schedule
    	lime.scheduleManager.schedule(function (dt) {

        	// Checking collision detection
        	if (goog.math.Box.intersects(wizard.getBoundingBox(), zombie.getBoundingBox())) {
            	console.log("Wizard die!");
        	} else if (wizard.isTarget(zombie) && !wizard.isLocking()) {
            	wizard.lockTarget(zombie);
        	} else {
            	//wizard.unlockTarget(zombie);
        	}

        	zombie.step(dt);
        	wizard.step(dt);
        	
        	// Check Magic collistion
        	goog.array.forEachRight(this.magics, function(magic) {
        		magic.step(dt);
        	});

    	}, this);
    	
    	// set current scene active
		this.director.replaceScene(this);
    }
    
    wvsz.Game.prototype.addWizard = function (wizard) {
    	this.wizard = wizard;
    	this.appendChild(wizard);
    }
    
    wvsz.Game.prototype.addZombie = function (zombie) {
    	this.zombie = zombie;
    	this.appendChild(zombie);
    }
    
    wvsz.Game.prototype.killZombie = function (zombie) {
    	this.removeChild(zombie);
    	delete this.zombie;
    	zombie = null;
    }
    
    wvsz.Game.prototype.addMagic = function (magic) {
    	goog.array.insert(this.magics, magic);
    	this.appendChild(magic);
    }
    
    wvsz.Game.prototype.removeMagic = function (magic) {
    	this.removeChild(magic);
    	goog.array.remove(this.magics, magic);
    	
    	// Avoid memory leak
    	magic = null;
    }
    
})();