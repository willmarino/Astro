import Projectile from "./projectile";

export default class Human{
	constructor(environment, context, computerProjectiles){
		this.type = 'human';

		this.CONSTANTS = {
      GRAVITY: 0.5
		};

		this.alive = true;
		this.environment = environment;
		this.context = context;
		this.computerProjectiles = computerProjectiles;
		this.projectiles = [];
		this.jumping = false;
		this.projectileCount = 0;

		this.additionalScore = 0;

		this.projectilesToDelete = [];

    this.xPos = 350;
    this.yPos = 100;
    this.yVel = 0;
    this.xVel = 0;
    this.width = 15;
		this.height = 15;
		
		this.onFloor = false;
		this.curPlat = null;
		this.lastPlat = this.environment.platforms[0];

		this.movingLeft = true;
		this.goingDown = false;

		this.bindLeft();
		this.bindRight();
		this.bindUndoRight();
		this.bindUndoLeft();

    this.bindJump();
    this.setClick = this.setClick.bind(this);
    this.setClick(this);
	}
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	animate(context) {
		this.move();
		this.draw(context);
		if (this.projectiles.length > 0) {
			this.projectiles.forEach((p) => {
				p.animate(context);
			});
		}
		this.projectiles = this.projectiles.filter(p => p.xPos < 1110 && p.xPos > -10 && p.yPos > -10 && p.yPos <710);
		this.collidedWithProjectiles();
	}

	draw(context) {
		context.fillStyle = 'gray';
		context.fillRect(
			this.xPos, this.yPos, this.width, this.height
		);
	}

	move(){
		if(!this.alive){
			this.yVel += this.CONSTANTS.GRAVITY;
			this.yPos += this.yVel;
			return;
		}
		// set jumping to false if velocity is positive(going down) and you are in air
		this.getCurrentPlatform();
		if(this.curPlat){
			
			if(this.yVel > 0 && this.yPos < (this.curPlat.yStart - 20 || this.lastPlat.yStart) ){ //if we have a downward velocity and were above platform
				this.jumping = false;
			}
		}else if(!this.curPlat){
			this.onFloor = false;
		}
		this.getCurrentPlatform();
		if(this.onFloor && !this.jumping){ // on floor and not jumping
			this.yPos = this.curPlat.yStart - this.height;
			this.yVel = 0;
			// 
			if ((this.xPos >= 800 && this.xVel >= 0) || (this.xPos <= 300 && this.xVel <= 0)) {
				null;
			} else {
				this.xPos += this.xVel;
			}
			// 
		}else if(!this.onFloor){ //in mid air
			if(this.curPlat){
				


				if(this.yPos >= this.curPlat.yStart - this.height && this.yVel >= 0){
					this.onFloor = true;
					// 
					if ((this.xPos >= 800 && this.xVel >= 0) || (this.xPos <= 300 && this.xVel <= 0)) {
						null;
					} else {
						this.xPos += this.xVel;
					}
					// 
					return;
				}
				// }else if((this.yPos < this.curPlat.yStart + this.curPlat.height + 10) && (this.yPos > this.curPlat.ystart + 5 )){
				// 	if ((this.xPos >= 800 && this.xVel >= 0) || (this.xPos <= 300 && this.xVel <= 0)) {
				// 		null;
				// 	} else {
				// 		this.xPos += this.xVel;
				// 	}
				// 	this.yPos = this.curPlat.ystart + this.curPlat.height;
				// 	this.yVel = 0;
				// 	this.yVel += this.CONSTANTS.GRAVITY;
				// 	this.yPos += this.yVel;
				// 	return;
				
			}
			this.yVel += this.CONSTANTS.GRAVITY;
			this.yPos += this.yVel;
			// 
			if ((this.xPos >= 800 && this.xVel >= 0) || (this.xPos <= 300 && this.xVel <= 0)) {
				null;
			} else {
				this.xPos += this.xVel;
			}
			// 
		}else if(this.onFloor && this.jumping){ // on floor but jumping	
			this.yPos += this.yVel;
			// 
			if ((this.xPos >= 800 && this.xVel >= 0) || (this.xPos <= 300 && this.xVel <= 0)) {
				null;
			} else {
				this.xPos += this.xVel;
			}
			// 
		}
		if(!this.movingLeft && !this.movingRight){
			debugger;
			if(this.xVel > 0){
				this.xVel -= .3;
			}else if(this.xVel < 0){
				this.xVel += .3;
			}
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------

	collidedWithFloor() {
		
		if (this.curPlat) {
			if (this.yPos >= this.curPlat.yStart - 10) {
				this.onFloor = true;
			}
		}
	}

	getCurrentPlatform() {
		// 
		let that = this;
		for (let i = 0; i < this.environment.platforms.length; i++) {
			let plat = that.environment.platforms[i];
			if (that.xPos > plat.xStart && that.xPos < plat.xStart + plat.width && that.yPos < plat.yStart + plat.height) {
				
				that.curPlat = plat;
				that.lastPlat = that.curPlat;
				break;
			} else {
				
				that.curPlat = null;
				// that.onFloor = false;
			}
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------

	bindLeft() {
		window.addEventListener('keypress', (e) => {
			if (e.key === 'a') {
				this.moveLeft();
				this.movingLeft = true;
			}
		});
	}

	bindUndoLeft(){
		window.addEventListener('keyup', (e) => {
			if (e.key === 'a') {
				// this.moveLeft();
				this.movingLeft = false;
			}
		});
	}

	bindRight(){
		window.addEventListener('keypress', (e) => {
			if (e.key === 'd') {
				this.moveRight();
				this.movingRight = true;
			}
		});
	}

	bindUndoRight(){
		window.addEventListener('keyup', (e) => {
			if (e.key === 'd') {
				// this.moveRight();
				this.movingRight = false;
			}
		});
	}

	bindJump() {
		window.addEventListener('keypress', (e) => {
			if (e.key === 'w') {
				this.jump();
			}
		});
	}

	bindDown(){
		window.addEventListener('keypress', (e) => {
			if(e.key === 's'){
				this.goingDown = true;
				this.down();
			}
		});
	}

	bindUndoDown(){
		window.addEventListener('keyup', (e) => {
			if (e.key === 's') {
				// this.down();
				this.goingDown = false;
			}
		});
	}

	setClick(that) {
		this.context.canvas.addEventListener('click', (e) => {
			let rect = this.context.canvas.getBoundingClientRect();
			let pos = {};
			pos.x = e.clientX - rect.left;
			pos.y = e.clientY - rect.top;
	
			// that.projectiles.push(new Projectile(
			// 	this.projectileCount,
			// 	that.xVel,
			// 	{ xPos: that.xPos, yPos: that.yPos}, 
			// 	that.context,
			// 	...that.configureProjectile(pos)
			// 	)
			// );
			that.projectiles.push(new Projectile(
				that,
				...that.configureProjectile(pos)
			));

			this.projectileCount += 1;
		});
	}

	configureProjectile(pos){
		let xDelta = pos.x - this.xPos;
		let yDelta = pos.y - this.yPos;

		let squaredDeltaX = Math.pow(xDelta, 2);
		let squaredDeltaY = Math.pow(yDelta, 2);
		let totalDeltasquared = squaredDeltaX + squaredDeltaY;
		let totalDelta = Math.sqrt(totalDeltasquared);

		let proportion = 20 / totalDelta;
		let xVel = xDelta * proportion;
		let yVel = yDelta * proportion;

		return [xVel, yVel];
	}
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	jump(){
		this.onFloor = false;
		this.jumping = true;
		this.yVel = -12;
	}

	moveRight(){
		// if(this.xVel < 0){
		// 	this.xVel = 0;
		// }
		// this.xVel += 4;
		// if(this.xVel >= 5){
		// 	this.xVel = 5;
		// }

		// if(this.xVel < 2.5){
		// 	this.xVel = 2.5;
		// }else{
		// 	this.xVel = 5;
		// }
		this.xVel = 5;
	}

	moveLeft() {
		// if (this.xVel > 0) {
		// 	this.xVel = 0;
		// }
		// this.xVel -= 4;
		// if (this.xVel <= -5) {
		// 	this.xVel = -5;
		// }
		this.xVel = -5;
	}

	down(){
		if(this.goingDown === true){
			this.yVel += 3;
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	
	collide(obj1, obj2) {
		// let obj1TopLeft = {x : obj1.xPos, y: obj1.yPos};
		// let obj1TopRight = { x: obj1.xPos + obj1.width, y: obj1.yPos };
		// let obj1BotLeft = { x: obj1.xPos, y: obj1.yPos + obj1.height };
		// let obj1BotRight = { x : obj1.xPos + obj1.width, y : obj1.yPos + obj1.height};

		let obj1Diag = Math.sqrt(Math.pow(obj1.width / 2, 2) + Math.pow(obj1.height / 2, 2)) / 2;

		// let obj2TopLeft = {x : obj2.xPos, y : obj2.yPos};
		// let obj2TopRight = { x: obj2.xPos + obj2.width, y: obj2.yPos };
		// let obj2BotLeft = { x: obj2.xPos, y: obj2.yPos + obj2.height };
		// let obj2BotRight = {x : obj2.xPos + obj2.width, y : obj2.yPos + obj2.height};

		let obj2Diag = Math.sqrt(Math.pow(obj2.width / 2, 2) + Math.pow(obj2.height / 2, 2)) / 2;

		let totalDelta = Math.sqrt(Math.pow(obj1.xPos - obj2.xPos, 2) + Math.pow(obj1.yPos - obj2.yPos, 2));

		// if((obj1TopLeft.x < obj2BotRight.x && obj1TopLeft.y < obj2BotRight.y) &&
		//   (obj1Diag + obj2Diag > totalDelta)){
		//   return true;
		// } else if (obj1TopRight.x > obj2BotLeft.x && obj1TopRight.y > obj2BotLeft.y && (obj1Diag + obj2Diag > totalDelta)){
		//   return true;
		// } else if (obj1BotRight.x > obj2TopLeft.x && obj1BotRight.y > obj2TopLeft.y && (obj1Diag + obj2Diag > totalDelta)){
		//   return true;
		// } else if (obj1BotLeft.x < obj2TopRight.x && obj1BotLeft.y > obj2TopRight.y && (obj1Diag + obj2Diag > totalDelta)){
		//   return true;
		// }else{
		//   return false;
		// }

		
		if (obj1Diag + obj2Diag + 5> totalDelta) {
			return true;
		} else {
			return false;
		}

	}

	collidedWithProjectiles() {
		let that = this;
		Object.values(this.computerProjectiles).forEach((p) => {
			if (that.collide(that, p)) {
				// that.projectilesToDelete.push(p);
				p.didHit = true;
				console.log('hit!');
				that.alive = false;
				// return true;
			}
		});
	}

	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------

}