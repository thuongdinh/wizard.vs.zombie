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
			zombie = new wvsz.Zombie(game);
			
		// Background
		game.appendChild(this.back);
        
		wizard.setPosition(game.WIDTH / 2, game.HEIGHT - wizard.getSize().height);
		zombie.setPosition(game.WIDTH/ 2, 0);

        wizard.setRotation(90);
	
		game.addWizard(wizard);
		game.addZombie(zombie);
	}

})();