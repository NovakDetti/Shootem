function Enemy(app) {
    this.texture = PIXI.Texture.from("assets/enemy.png");
    PIXI.TilingSprite.call(this, this.texture, 120, 123);

    this.position.x = 700;
    this.position.y = Math.floor(Math.random()*400+1);
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
    this.viewportY = 0;

    this.actualApp = app;

}

Enemy.prototype = Object.create(PIXI.TilingSprite.prototype);

Enemy.prototype.checkIfDissapear = function (){
    return this.viewportX < -120 || this.viewportY < -120
}

Enemy.prototype.angleBetweenPoints = function (a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
}
