function Main(app) {

	const MIN_SCROLL_SPEED = 5;
	const MAX_SCROLL_SPEED = 15;
	const SCROLL_ACCELERATION = 0.005;
	let scrollSpeed = MIN_SCROLL_SPEED;

	const gameSpace = new GameSpace( app);

	loadSpriteSheet();

	function spriteSheetLoaded () {
		requestAnimationFrame(update.bind(app));
	};

	function loadSpriteSheet () {
		let loader = PIXI.Loader.shared;
		loader.add("space", "assets/background.jpg");
		loader.add("enemy", "assets/enemy.png");
		loader.add("gun", "assets/gun.png");
		loader.add("ship", "assets/space.png");
		loader.onComplete.add(() => {spriteSheetLoaded() });
		loader.load();
	};

	function update () {
		gameSpace.moveViewportXBy(scrollSpeed, app);
		scrollSpeed += SCROLL_ACCELERATION;
		if (scrollSpeed > MAX_SCROLL_SPEED) {
			scrollSpeed = MAX_SCROLL_SPEED;
		}

		requestAnimationFrame(update.bind(app.view));
	};


}




