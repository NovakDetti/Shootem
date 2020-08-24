function Gun() {
    let texture = PIXI.Texture.from("assets/gun.png");
    PIXI.TilingSprite.call(this, texture, 800, 47);

    this.viewportX = 0;
}

Gun.prototype = Object.create(PIXI.TilingSprite.prototype);

Gun.DELTA_X = 0.29;

Gun.prototype.setViewportX = function (newViewportX) {
    let distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Gun.DELTA_X);
};