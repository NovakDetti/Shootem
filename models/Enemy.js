function Enemy(app) {
    this.texture = PIXI.Texture.from("assets/enemy.png");
    PIXI.TilingSprite.call(this, this.texture, 120, 123);

    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
    this.viewportY = 0;

    this.actualApp = app;

}

Enemy.prototype = Object.create(PIXI.TilingSprite.prototype);