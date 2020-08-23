function Space() {
    var texture = PIXI.Texture.from("assets/space.png");
    PIXI.TilingSprite.call(this, texture, 150, 118);

    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;
    this.cursor = "none";
    this.interactive = true

    window.addEventListener("keydown", (e) => {
        console.log(e.keyCode)
        switch(e.keyCode){
            case 37:
                this.position.x += 10;
                break;
            case 38:
                this.position.y -= 10;
                break;
            case 39:
                this.position.x += 10;
                break;
            case 40:
                this.position.y += 10;
                break;
        }
    })

}

Space.prototype = Object.create(PIXI.TilingSprite.prototype);

