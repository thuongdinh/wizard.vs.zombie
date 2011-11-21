goog.provide('wizard.Level');

goog.require('lime.Sprite');
goog.require('lime.Layer');
goog.require('lime.Scene');

wizard.Level = function(game) {
    lime.Sprite.call(this);

    this.game = game;

    //empty layer for contents
    var layer = new lime.Layer();
    this.appendChild(layer);

    var back = new lime.RoundedRect().setSize(690, 690).setAnchorPoint(0, 0).setPosition(17, 166).setRadius(30);
    for (var c = 0; c < this.board.cols; c++) {
        for (var r = 0; r < this.board.rows; r++) {
            var b = new lime.Sprite().setFill('assets/wall1.png').setAnchorPoint(0, 0).
                setSize(this.board.GAP * .94, this.board.GAP * .94).
                setPosition(11 + c * this.board.GAP, 11 + r * this.board.GAP);
            b.qualityRenderer = true; // no jagged edges on moz for this one
            back.appendChild(b);
        }
    }
    layer.appendChild(back);
    this.appendChild(layer);
}
goog.inherits(wvsz.Level, lime.Sprite);