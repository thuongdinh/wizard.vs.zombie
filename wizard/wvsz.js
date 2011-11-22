//set main namespace
goog.provide('wvsz');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('wvsz.Level');
goog.require('wvsz.Wizard');
goog.require('wvsz.Zombie');

// entrypoint
wvsz.start = function(){

	var director = new lime.Director(document.getElementById("container"),480,360),
	    scene = new lime.Scene(),
        level = new wvsz.Level(this),
        wizard = new wvsz.Wizard(this),
        zombie = new wvsz.Zombie(this);

    wizard.setPosition(100, 100);
    zombie.setPosition(200, 200);

    scene.appendChild(level);
    scene.appendChild(wizard);
    scene.appendChild(zombie);

    goog.events.listen(scene,['mousedown','touchstart'],function(e){
        
        wizard.moteToPosition(e.position);

    });

    //director.makeMobileWebAppCapable();

	// set current scene active
	director.replaceScene(scene);

    // Start schedule
    lime.scheduleManager.schedule(function (dt) {

        // Checking collision detection
        if (!(wizard.getBottom() < zombie.getTop() ||
              wizard.getTop() > zombie.getBottom() ||
              wizard.getLeft() > zombie.getRight() ||
              wizard.getRight() < zombie.getLeft())) {
            console.log("Wizard die!");
        } else if (wizard.isTarget(zombie) && !wizard.isLocking()) {
            wizard.lockTarget(zombie);
        } else {
            //wizard.unlockTarget(zombie);
        }

        zombie.step(dt);
        wizard.step(dt);

    }, this);
}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('wvsz.start', wvsz.start);

wvsz.isBrokenChrome = function(){
   return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
}