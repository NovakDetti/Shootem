function GameSpace( app ) {
	let enemyCounter = 0;
	let playerLife = 3;

	this.b = new Bump(PIXI);

	this.background = new Background();
	app.stage.addChild(this.background);

	this.space = new Space();
	app.stage.addChild(this.space);

	this.gun = new Gun();

	this.gameLetterhead = new GameLetterhead();
	app.stage.addChild(this.gameLetterhead)
	let playerLives = new PIXI.Text(`Player lives: ${playerLife}`, { fontFamily: 'Arial', fontSize: 13});
	playerLives.x = 10;
	playerLives.y = 30;
	this.gameLetterhead.addChild(playerLives);
	let enemysCount = new PIXI.Text(`Destroyed enemies : ${enemyCounter}`, { fontFamily: 'Arial', fontSize: 13 });
	enemysCount.x = 120;
	enemysCount.y = 30;
	this.gameLetterhead.addChild(enemysCount);

	const explosionTextures = [];
	app.loader
		.add('explode', 'assets/explode_sprite/explode.json')
		.load(() => {
			for (i = 0; i < 26; i++) {
				const texture = PIXI.Texture.from(`explode_${i + 1}.png`);
				explosionTextures.push(texture);
			}
		});

	this.enemy = new Enemy();
	randomFly(this.enemy, 0);

	function randomFly(enemy, timeout){
		setTimeout(timeout);
		app.stage.addChild(enemy);
		let path = [Math.round(Math.random() * 700 + 1), Math.round(Math.random() * 400 + 1), 800, Math.round(Math.random() * 600 + 1), 840, Math.round(Math.random() * 200 + 1)];
		let path2 = [{
			x: 0,
			y: 0
		}];
		for (let i = 0; i < path.length; i = i + 2) {
			path2.push({ x: path[i], y: path[i + 1] })
		}
		gsap.registerPlugin(MotionPathPlugin);

		var tween = gsap.from(enemy, {
			duration: 2,
			repeatDelay: 3,
			ease: "none",
			motionPath: {
				path: path2,
				type: 'cubic'
			}
		});
		setTimeout(() => app.stage.removeChild(enemy), 2000)

	}

	function explode(posX, posY){
		let explosion;
		explosion = new PIXI.AnimatedSprite(explosionTextures);
		explosion.x = posX + 50;
		explosion.y = posY + 50;
		explosion.anchor.set(0.5);
		explosion.scale.set(0.75);
		explosion.gotoAndPlay(Math.random() * 27);
		app.stage.addChild(explosion);
		setTimeout(() => app.stage.removeChild(explosion), 300 )
		
	}

	window.addEventListener("keydown", (e) => {
		if (e.keyCode === 32){
				this.gun.position.x = this.space.position.x + this.space.width-20;
				this.gun.position.y = this.space.position.y + this.space.height/3;
				this.gun.tilePosition.x = 0;
				this.gun.tilePosition.y = 0;
				app.stage.addChild(this.gun);
				if (this.b.hit(this.gun, this.enemy)) {
					app.stage.removeChild(this.enemy)
					enemyCounter +=1;
					enemysCount.text = `Destroyed enemies : ${enemyCounter}`;
					console.log(enemyCounter)
					explode(this.enemy.x, this.enemy.y);
					setTimeout(() => {
						app.stage.removeChild(this.gun)
						this.enemy = new Enemy();
						randomFly(this.enemy, 0)
					}, 400)
				}
			
				setTimeout(() => {
					app.stage.removeChild(this.gun)
				}, 400)
			
		}
	})

	this.viewportX = 0;

}

GameSpace.prototype.setViewportX = function(viewportX) {
	this.viewportX = viewportX;
	this.background.setViewportX(viewportX);
	this.gun.setViewportX(-viewportX);
	
};

GameSpace.prototype.moveViewportXBy = function(units, app) {
	var newViewportX = this.viewportX + units;
	this.setViewportX(newViewportX, app);

};
