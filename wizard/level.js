goog.provide('wvsz.Level');

goog.require('lime.Sprite');
goog.require('lime.RoundedRect');

wvsz.Level = function(game) {
    lime.Sprite.call(this);

    this.game = game;

    this.SIZE = 480;
    this.rows = 12;
    this.cols = 15;
    this.gems = new Array(10);
    this.GAP = Math.round(this.SIZE / this.cols);

    if(wvsz.isBrokenChrome()) this.setRenderer(lime.Renderer.CANVAS);

    var back = new lime.RoundedRect().setSize(480, 360).setAnchorPoint(0, 0).setPosition(0, 0).setRadius(0);
    for (var c = 0; c < this.cols; c++) {
        for (var r = 0; r < this.rows; r++) {
            var b = new lime.Sprite().setFill('assets/slatefloor.png').setAnchorPoint(0, 0).
                setSize(32, 32).
                setPosition(c * 32, r * 32);
            b.qualityRenderer = true; // no jagged edges on moz for this one
            back.appendChild(b);
        }
    }
    this.appendChild(back);
}
goog.inherits(wvsz.Level, lime.Sprite);