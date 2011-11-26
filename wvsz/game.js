//(function() {
    
    goog.provide('wvsz.Game');

    goog.require('lime');
    goog.require('lime.animation.KeyframeAnimation');
    goog.require('lime.animation.MoveBy');
    goog.require('lime.Scene');
    goog.require('goog.math.Coordinate');
    goog.require('goog.array');

    /**
     * @constructor
     */
    wvsz.Game = function(director) {
        lime.Scene.call(this);
        
        this.director = director;
        this.wizard = null;
        this.zombies = [];
        this.magics = [];
        this.level = new wvsz.Level(this);
        this.HEIGHT = 320;
        this.WIDTH = 480;
        
        this.level.initEntities();
    }
    goog.inherits(wvsz.Game, lime.Scene);
    
    wvsz.Game.prototype.start = function () {
    	var self = this;
    	
    	goog.events.listen(this,['mousedown','touchstart'],function(e){
        
        	self.wizard.moteToPosition(e.position);

    	});
    	
    	// Start schedule
    	lime.scheduleManager.schedule(function (dt) {

        	// Checking collision detection
        	/*if (self.zombie && goog.math.Box.intersects(self.wizard.getBoundingBox(), self.zombie.getBoundingBox())) {
            	console.log("Wizard die!");
        	} else if (self.wizard.isTarget(self.zombie) && !self.wizard.isLocking()) {
            	self.wizard.lockTarget(self.zombie);
        	} else {
            	//wizard.unlockTarget(zombie);
        	}
        	
        	self.wizard.step(dt);*/

    	}, this);
    	
    	// set current scene active
		this.director.replaceScene(this);
    }
    
    wvsz.Game.prototype.addWizard = function (wizard) {
    	this.wizard = wizard;
    	this.appendChild(wizard);
    }
    
    wvsz.Game.prototype.addZombie = function (zombie) {
    	goog.array.insert(this.zombies, zombie);
    	this.appendChild(zombie);
    }
    
    wvsz.Game.prototype.killZombie = function (zombie) {
    	this.wizard.unlockTarget(zombie);
    	
    	this.removeChild(zombie);
    	goog.array.remove(this.zombies, zombie);
    	
    	// Avoid memory leak
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
    
//})();