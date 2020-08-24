function Launch() {
    let app = new PIXI.Application();
    document.getElementById("game-frame").appendChild(app.view);

    let menuContainer = new PIXI.Container();

    let stars = [];
    for(let i = 0; i< 100; i++){
        this.star = new PIXI.Sprite.from("assets/star.png");
        this.star.x = 50;
        this.star.y = 30;
        this.star.width = 5;
        this.star.height = 5;
        stars.push(this.star);
        menuContainer.addChild(this.star);
    }

    stars.forEach(star => TweenLite.to(star, 3, { x: Math.random() * 800 + 1, y: Math.random() * 600 + 1, ease: Power4.easeIn }))


    this.logo = new PIXI.Sprite.from("assets/logo.png");
    this.logo.x = 300;
    this.logo.y = 30;
    this.logo.width = 200;
    this.logo.height = 50;
    menuContainer.addChild(this.logo);

    let button1 = new Button("assets/game1Button.png", 300, 100);
    menuContainer.addChild(button1);

    let button2 = new Button("assets/game2Button.png", 300, 200);
    menuContainer.addChild(button2);

    let button3 = new Button("assets/game3Button.png", 300, 300);
    menuContainer.addChild(button3);

    let quit = new Button("assets/quitButton.png", 300, 400);
    menuContainer.addChild(quit);

    // add event listeners to make buttons interactive

    button1.on('mousedown', () => loadGame());
    button2.on('mousedown', () => loadGame());
    button3.on('mousedown', () => loadGame());

    quit.on('mousedown', () => {
        window.confirm("Are you sure you want to quit?")
    })

    //add menu after launch

    let launchScreen = PIXI.Sprite.from("assets/background.jpg");
    app.stage.addChild(launchScreen);

    setTimeout(() => {
        app.stage.removeChild(launchScreen);
        app.stage.addChild(menuContainer)
    }, 2000);

    loadSpriteSheet();

    function update() {
        requestAnimationFrame(update.bind(this));    };

    function loadSpriteSheet () {
        var loader = PIXI.Loader.shared;
        loader.add("background", "assets/game-space.jpg");
        loader.add("star", "assets/star.png");
        loader.load();
    };

    function loadGame () {
        app.stage.removeChild(menuContainer);
        let main = new Main(app);
        requestAnimationFrame(update.bind(this));
    }
    
}