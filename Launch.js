function Launch() {
    let app = new PIXI.Application();
    document.getElementById("game-frame").appendChild(app.view);

    let menuContainer = new PIXI.Container();

    let button1 = new Button("assets/game1Button.png", 300, 100);
    menuContainer.addChild(button1);

    let button2 = new Button("assets/game2Button.png", 300, 200);
    menuContainer.addChild(button2);

    let button3 = new Button("assets/game3Button.png", 300, 300);
    menuContainer.addChild(button3);

    let quit = new Button("assets/quitButton.png", 300, 400);
    menuContainer.addChild(quit);
    //add menu after launch

    let launchScreen = PIXI.Sprite.from("assets/background.jpg");
    app.stage.addChild(launchScreen);

    setTimeout(() => {
        app.stage.removeChild(launchScreen);
        app.stage.addChild(menuContainer)
    }, 2000);

    button1.on('mousedown', () => {
        app.stage.removeChild(menuContainer);
        let main = new Main(app);
        requestAnimationFrame(update.bind(this));
    });

    createBackground();
    loadSpriteSheet();

    function update() {
        requestAnimationFrame(update.bind(this));
    };

    function loadSpriteSheet () {
        var loader = PIXI.Loader.shared;
        loader.add("background", "assets/space.jpg");
        loader.add("star", "assets/star.png");
        loader.load();
    };

    function createBackground(){
        let starAmount = 100;
        for (let i = 0; i < starAmount; ++i) {
            let star = new PIXI.Sprite.from("assets/star.png");
            star.width = 2;
            star.height = 2;
            star.x = Math.floor(Math.random() * 800 + 1)
            star.y = Math.floor(Math.random() * 600 + 1)
            app.stage.addChild(star);
        }
    }

    
}