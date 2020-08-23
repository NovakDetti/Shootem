function Background() {
	var texture = PIXI.Texture.from("assets/game-space.jpg");
	PIXI.TilingSprite.call(this, texture, 800, 600);

	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	this.viewportX = 0;
}

Background.prototype = Object.create(PIXI.TilingSprite.prototype);

Background.DELTA_X = 0.064;

Background.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * Background.DELTA_X);
};