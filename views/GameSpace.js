function GameSpace( app ) {
	let enemyCounter = 0;

	this.background = new Background();
	app.stage.addChild(this.background);

	this.space = new Space();
	app.stage.addChild(this.space);

	this.gun = new Gun();

	this.enemy = new Enemy();
	randomFly(this.enemy, 0);

	this.gameLetterhead = new GameLetterhead();
	app.stage.addChild(this.gameLetterhead)
	let enemysCount = new PIXI.Text(`Destroyed enemies : ${enemyCounter}`, { fontFamily: 'Arial', fontSize: 13 });
	enemysCount.x = 40;
	enemysCount.y = 30;
	this.gameLetterhead.addChild(enemysCount);

	//load assets to explosion

	this.explosionTextures = [];
	app.loader
		.add('explode', 'assets/explode_sprite/explode.json')
		.load(() => {
			for (i = 0; i < 26; i++) {
				const texture = PIXI.Texture.from(`explode_${i + 1}.png`);
				this.explosionTextures.push(texture);
			}
		});

	function randomFly(enemy, timeout){
		setTimeout(timeout);
		app.stage.addChild(enemy);
		let path = [Math.round(Math.random() * 700 + 1), Math.round(Math.random() * 400 + 1), 400, Math.round(Math.random() * 600 + 1), 840, Math.round(Math.random() * 600 + 200)];
		let path2 = [{
			x: -100,
			y: Math.round(Math.random() * 600 + 1)
		}];
		for (let i = 0; i < path.length; i = i + 2) {
			path2.push({ x: path[i], y: path[i + 1] })
		}
		gsap.registerPlugin(MotionPathPlugin);

		let tween = gsap.from(enemy, {
			duration: 3,
			repeatDelay: 3,
			ease: "none",
			motionPath: {
				path: path2,
				type: 'cubic'
			}
		});
		
		setTimeout(() => app.stage.removeChild(enemy), 3000)
	}

	window.addEventListener("keydown", (e) => {
		if (e.keyCode === 32){
				this.gun.position.x = this.space.position.x + this.space.width-10;
				this.gun.position.y = this.space.position.y + this.space.height - 80;
				this.gun.tilePosition.x = 0;
				this.gun.tilePosition.y = 0;
				app.stage.addChild(this.gun);
				if (this.checkIfCollide(this.gun, this.enemy)) {
					app.stage.removeChild(this.enemy)
					enemyCounter +=1;
					enemysCount.text = `Destroyed enemies : ${enemyCounter}`;
					this.explode(this.enemy.x, this.enemy.y);
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
	this.actApp = app;
}

GameSpace.prototype.explode = function (posX, posY, sprite = null) {
	let explosion = new PIXI.AnimatedSprite(this.explosionTextures);
	explosion.x = posX + 50;
	explosion.y = posY + 50;
	explosion.anchor.set(0.5);
	explosion.scale.set(0.75);
	explosion.gotoAndPlay(Math.random() * 27);
	this.actApp.stage.addChild(explosion);
	this.actApp.stage.removeChild(sprite)
	setTimeout(() => this.actApp.stage.removeChild(explosion), 300)
};


GameSpace.prototype.checkIfCollide = function (sprite1, sprite2) {
	let sprite1Bounds = sprite1.getBounds();
	let sprite2Bounds = sprite2.getBounds();
	if ((sprite1Bounds.x + sprite1Bounds.width-20) > sprite2Bounds.x
		&& sprite1Bounds.x < (sprite2Bounds.x + sprite2Bounds.width - 20)
		&& (sprite1Bounds.y + sprite1Bounds.height) > sprite2Bounds.y
		&& sprite1Bounds.y < (sprite2Bounds.y + sprite2Bounds.height)
	) {
		return true;
	}
}

GameSpace.prototype.setViewportX = function(viewportX) {
	this.viewportX = viewportX;
	this.background.setViewportX(viewportX);
	this.gun.setViewportX(-viewportX);
};

GameSpace.prototype.moveViewportXBy = function(units, app) {
	let newViewportX = this.viewportX + units;
	this.setViewportX(newViewportX, app);
	if(this.checkIfCollide(this.space, this.enemy)){
		this.explode(this.space.x, this.space.y, this.space)
		setTimeout(() => {
			PIXI.loader.reset();
			this.actApp.destroy(true);
			PIXI.utils.destroyTextureCache();
			this.actApp = null;
			document.getElementById("game-frame").innerHTML= "";
			let launch = new Launch();
		}, 1500)
		
	}
};


