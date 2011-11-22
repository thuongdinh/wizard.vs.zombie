(function() {

    goog.provide('wvsz.Zombie');

    goog.require("lime.ASSETS.zombie.plist");
    goog.require('lime.Sprite');
    goog.require('lime.SpriteSheet');

    wvsz.Zombie = function(game) {
        lime.Sprite.call(this);

        this.game = game;
        this.spriteSheet = new lime.SpriteSheet('assets/zombie.png',lime.ASSETS.zombie.plist);

        this.setSize(32,32).setFill(this.spriteSheet.getFrame('zombie01.png'));
    }
    goog.inherits(wvsz.Zombie, lime.Sprite);

    wvsz.Zombie.prototype.step = function (dt) {
        
    }

    wvsz.Zombie.prototype.getTop = function () {
        return this.getPosition().y;
    }

    wvsz.Zombie.prototype.getBottom = function () {
        return this.getPosition().y + this.getSize().height;
    }

    wvsz.Zombie.prototype.getLeft = function () {
        return this.getPosition().x;
    }

    wvsz.Zombie.prototype.getRight = function () {
        return this.getPosition().x + this.getSize().width;
    }

})();