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
goog.require('wvsz.Game');

// entrypoint
wvsz.start = function(){

	var director = new lime.Director(document.getElementById("container"),480,360),
	    game = new wvsz.Game(director);
        
    // start a game
    game.start();
}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('wvsz.start', wvsz.start);

wvsz.isBrokenChrome = function(){
   return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
}