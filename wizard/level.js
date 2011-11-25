(function () {

	goog.provide('wvsz.Level');
	
	goog.require('lime.Sprite');
	goog.require('lime.RoundedRect');
	
	wvsz.Level = function(game) {
		this.game = game;
	
		this.SIZE = 480;
		this.rows = 12;
		this.cols = 15;
		this.gems = new Array(10);
		this.GAP = Math.round(this.SIZE / this.cols);
		this.MAX_ENEMIES = 10;
		this.DEFAULT_ENEMIES_POS = new goog.math.Coordinate(game.WIDTH/ 2, 0);
		
		this.back = new lime.RoundedRect().setSize(480, 360)
										  .setAnchorPoint(0, 0)
										  .setPosition(0, 0)
										  .setRadius(0);
										 
		if(wvsz.isBrokenChrome()) this.back.setRenderer(lime.Renderer.CANVAS);
		
		for (var c = 0; c < this.cols; c++) {
			for (var r = 0; r < this.rows; r++) {
				var b = new lime.Sprite().setFill('assets/slatefloor.png').setAnchorPoint(0, 0).
					setSize(32, 32).
					setPosition(c * 32, r * 32);
				b.qualityRenderer = true; // no jagged edges on moz for this one
				this.back.appendChild(b);
			}
		}
	}
	
	wvsz.Level.prototype.initEntities = function () {
		var game = this.game,
			wizard = new wvsz.Wizard(game),
			self = this;
			
		// Background
		game.appendChild(this.back);
        
		wizard.setPosition(game.WIDTH / 2, game.HEIGHT - wizard.getSize().height);
		
		// Repeat adding zombie to game
		lime.scheduleManager.scheduleWithDelay(function () {
			if (game.zombies.length < this.MAX_ENEMIES ) {
				var zombie = new wvsz.Zombie(game);
			
				zombie.setPosition(game.WIDTH/ 2, 0);
			
				game.addZombie(zombie);
			}
		}, this, 1000);

        wizard.setRotation(90);
	
		game.addWizard(wizard);
		
	}

})();