function Menu(app) {

    this.menuContainer = new PIXI.Container();

    this.button1 = new Button("assets/game1Button.png", 300, 100);
    this.menuContainer.addChild(this.button1);

    this.button2 = new Button("assets/game2Button.png", 300, 200);
    this.menuContainer.addChild(this.button2);

    this.button3 = new Button("assets/game3Button.png", 300, 300);
    this.menuContainer.addChild(this.button3);

    this.quit = new Button("assets/quitButton.png", 300, 400);
    this.menuContainer.addChild(this.quit);

    app.stage.addChild(this.menuContainer)

    this.button1.on('mousedown', () => {
        app.stage.removeChild(this.menuContainer);
        let main = new Main();
        requestAnimationFrame(update.bind(this));
    });

    function update() {
        requestAnimationFrame(update.bind(this));
    };
}