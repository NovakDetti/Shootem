function GameLetterhead() {
    var texture = PIXI.Texture.from("assets/letterhead.png");
    this.sprite = PIXI.Sprite.call(this, texture);

    this.position.x = 470;
    this.position.y = 10;
}

GameLetterhead.prototype = Object.create(PIXI.Sprite.prototype);
