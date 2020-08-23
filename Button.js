function Button(imgUrl, posX, posY) {
    var texture = PIXI.Texture.from(imgUrl);
    PIXI.TilingSprite.call(this, texture, 200, 64);

    this.position.x = posX;
    this.position.y = posY;
    this.interactive = true;
    this.cursor = "pointer";
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

}

Button.prototype = Object.create(PIXI.TilingSprite.prototype);
