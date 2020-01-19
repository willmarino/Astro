import Projectile from "./projectile";

export default class Human{
	constructor(environment, context, computerProjectiles){
		this.type = 'human';

		this.CONSTANTS = {
			GRAVITY: 0.5,
			NORMALFORCE: -0.5
		};

		this.alive = true;
		this.projectiles = {};
		this.environment = environment;
		this.context = context;
		this.computerProjectiles = computerProjectiles;
		this.jumping = false;
		this.projectileCount = 0;

		this.additionalScore = 0;

		this.curJumps = 0;
		this.dashes = 0;

    this.xPos = 350;
    this.yPos = 100;
    this.yVel = 0;
    this.xVel = 0;
    this.width = 15;
		this.height = 15;
		
		this.onFloor = false;
		this.curPlat = null;
		this.lastPlat = this.environment.platforms[0];

		this.movingLeft = false;
		this.movingRight = false;
		this.goingDown = false;

		this.distanceCovered = 0;

		this.bindLeft();
		this.bindRight();
		this.bindUndoRight();
		this.bindUndoLeft();
		this.bindDown();
		this.bindUndoDown();
		this.bindDash();

    this.bindJump();
    this.setClick = this.setClick.bind(this);
    this.setClick(this);
	}
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------MAIN---------------------------------------------------
	// ----------------------------------MAIN--------------------------------------------------------------
	// ----------------------------------MAIN--------------------------------------------------------------
	// ----------------------------------MAIN--------------------------------------------------------------
	// ----------------------------------MAIN--------------------------------------------------------------
	// ----------------------------------MAIN--------------------------------------------------------------

	// filterProjectiles(){
	// 	let newProjectiles = {};
	// 	let that = this;
	// 	Object.keys(this.projectiles).forEach((key) => {
	// 		if(that.projectiles[key].yPos < 710 && that.projectiles[key].yPos > -10){
	// 			let projectile = {[key]: that.projectiles[key]}
	// 			newProjectiles = Object.assign(projectile, newProjectiles);
	// 		}
	// 	})
	// 	this.projectiles = newProjectiles;
	// }


	animate(context) {
		this.move();
		this.draw(context);
		// if (Object.values(this.projectiles).length > 0) {
		// 	Object.values(this.projectiles).forEach((p) => {
		// 		p.animate(context);
		// 	});
		// }
		// this.filterProjectiles();
		// this.collidedWithProjectiles();
	}

	draw(context) {
		context.fillStyle = 'gray';
		context.fillRect(
			this.xPos, this.yPos, this.width, this.height
		);
	}

	move(){
		// if player is no longer 'alive', then apply gravity until they fall off screen
		if(!this.alive){
			this.applyGravity();
			this.yPos += this.yVel;
			return;
		}

		// check whether or not the player is above a platform, and if so, which platform
		this.getCurrentPlatform();

		// if player is above a platform, set jumping flag to false based on velocity and position
		// if player is not above a platform, set onfloor flag to false
		if(this.curPlat){
			if(this.yVel > 0 && this.yPos < (this.curPlat.yStart - 20 || this.lastPlat.yStart) ){
				this.jumping = false;
			}
		}else if(!this.curPlat){
			this.onFloor = false;
		}
		// check whether or not the player is above a platform, and if so, which platform
		this.getCurrentPlatform();

		// if player is onfloor and not jumping, reset dashes and jumps, set yPos platform plus player height,
		// set yVel to zero, and apply horizontal movement based on whether or not player has reached the designated side zones
		if(this.onFloor && !this.jumping){
			this.dashes = 0;
			this.curJumps = 0;
			this.yPos = this.curPlat.yStart - this.height;
			this.yVel = 0;
			this.isPlayerOnSide();
		// if player is not yet 'onfloor', but is above a platform, check ypos to see whether onfloor flag should be set to true
		// apply horizontal movement based on whether or not player has reached the designated side zones
		// whether or not player is above a platform, apply gravity
		}else if(!this.onFloor){
			if(this.curPlat){
				if(this.yPos >= this.curPlat.yStart - this.height && this.yVel >= 0){
					this.onFloor = true;
					this.isPlayerOnSide();
					return;
				}
			}
			this.yVel += this.CONSTANTS.GRAVITY;
			this.yPos += this.yVel;
			this.isPlayerOnSide();
		// if player is onfloor but jumping, have them leave the floor, circumventing the floor-stick effect
		}else if(this.onFloor && this.jumping){
			this.yPos += this.yVel;
			this.isPlayerOnSide();
		}
		// apply friction to player movement to slow them down if no movement keys are being pressed.
		if(!this.movingLeft && !this.movingRight){
			if(this.xVel > 0){
				this.xVel -= .3;
			}else if(this.xVel < 0){
				this.xVel += .3;
			}
		}
		// add change in xPos to total distance covered, will be used to change rounds
		this.distanceCovered += this.xVel;
	}

	// if player is at 300 or 800 px, stop horizontal movement to avoid leaving screen and give player
	// a view of upcoming obstacles
	isPlayerOnSide(){
		if ((this.xPos >= 800 && this.xVel >= 0) || (this.xPos <= 300 && this.xVel <= 0)) {
			null;
		} else {
			this.xPos += this.xVel;
		}
	}

	// --------------------------------------------------------------------------------------------------
	// ----------------------BASIC UTIL---------------------------------------------------------------
	// ----------------------BASIC UTIL---------------------------------------------------------------
	// ----------------------BASIC UTIL---------------------------------------------------------------
	// ----------------------BASIC UTIL---------------------------------------------------------------
	// ----------------------BASIC UTIL---------------------------------------------------------------
	// ----------------------BASIC UTIL---------------------------------------------------------------
	applyGravity(){
		this.yVel += this.CONSTANTS.GRAVITY;
	}

	isInAir(){
		if(!this.curPlat){
			return true;
		}
		if(this.yPos < (this.curPlat.yStart - this.height)){
			return true;
		}
		return false;
	}

	isOnFloor(){
		if(!this.curPlat){
			return false;
		}
		if(this.yPos > (this.curPlat.yStart - this.curPlat.height)){
			if(this.yPos < (this.curPlat.yStart + 5)){
				return true;
			}
		}
		return false;
	}

	// --------------------------------------------------------------------------------------------------
	// ----------------------COLLISION LOGIC---------------------------------------------------------------
	// ----------------------COLLISION LOGIC---------------------------------------------------------------
	// ----------------------COLLISION LOGIC---------------------------------------------------------------
	// ----------------------COLLISION LOGIC---------------------------------------------------------------
	// ----------------------COLLISION LOGIC---------------------------------------------------------------
	// ----------------------COLLISION LOGIC---------------------------------------------------------------

	collidedWithFloor() {
		if (this.curPlat) {
			if (this.yPos >= this.curPlat.yStart - 10) {
				this.onFloor = true;
			}
		}
	}

	// checks if player xPos is between the left and right edges of any platform('above platform')
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
	// -------------------------MOVEMENT BINDS--------------------------------------------------------------------------
	// -------------------------MOVEMENT BINDS---------------------------------------------------------------------------
	// -------------------------MOVEMENT BINDS---------------------------------------------------------------------------
	// -------------------------MOVEMENT BINDS-------------------------------------------------------------
	// -------------------------MOVEMENT BINDS---------------------------------------------------------------------------
	// -------------------------MOVEMENT BINDS---------------------------------------------------------------------------

	bindLeft() {
		window.addEventListener('keypress', (e) => {
			if (e.key === 'a') {
				this.moveLeft();
				this.movingLeft = true;
				this.movingRight = false;
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
				this.movingLeft = false;
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

	// loop sets five timeouts in order to gradually slow down player after dashing
	bindDash(){
		window.addEventListener('keypress', (e) => {
			if(e.key === 'Spacebar' || e.key === ' '){
				if(this.dashes > 0){
					return;
				}
				if(this.movingLeft){
					this.xVel -= 7.5;
					this.dashes += 1;
					for(let i = 0; i < 5; i++){
						setTimeout(() => {
							this.xVel += 1.5;
						}, 100 * i)
					}
				}else if(this.movingRight){
					this.xVel += 7.5;
					this.dashes += 1;
					for(let i = 0; i < 5; i++){
						setTimeout(() => {
							this.xVel -= 1.5;
						}, 100 * i)
					}
				}
			}
		})
	}



// ----------------------------------------------------------------------------------------------------
// -------------------------PROJECTILE BIND AND CONFIG--------------------------------------------------------------------------
// -------------------------PROJECTILE BIND AND CONFIG---------------------------------------------------------------------------
// -------------------------PROJECTILE BIND AND CONFIG---------------------------------------------------------------------------
// -------------------------PROJECTILE BIND AND CONFIG-------------------------------------------------------------
// -------------------------PROJECTILE BIND AND CONFIG---------------------------------------------------------------------------
// -------------------------PROJECTILE BIND AND CONFIG---------------------------------------------------------------------------

	// if player clicks, fetch click coordinates, wrap them in an object, create a projectile with the result
	// of passing that object into configureProjectile
	setClick(that) {
		this.context.canvas.addEventListener('click', (e) => {
			let rect = this.context.canvas.getBoundingClientRect();
			let pos = {};
			pos.x = e.clientX - rect.left;
			pos.y = e.clientY - rect.top;

			let newProj = new Projectile(that, ...that.configureProjectile(pos));
			let newId = newProj.id;
			that.projectiles = Object.assign({[newId]: newProj}, that.projectiles);

			this.projectileCount += 1;
		});
	}

	// calculates the necessary x and y velocities for the projectile(starting at player position)
	// to get to the coordinates of the click
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
	// -------------------------MOVEMENT--------------------------------------------------------------------------
	// -------------------------MOVEMENT---------------------------------------------------------------------------
	// -------------------------MOVEMENT---------------------------------------------------------------------------
	// -------------------------MOVEMENT-------------------------------------------------------------
	// -------------------------MOVEMENT---------------------------------------------------------------------------
	// -------------------------MOVEMENT---------------------------------------------------------------------------

	jump(){
		if(this.curJumps < 2){
			this.onFloor = false;
			this.jumping = true;
			this.yVel = -12;
			this.curJumps += 1;
		}
	}

	moveRight(){
		this.xVel = 5;
	}

	moveLeft() {
		this.xVel = -5;
	}

	down(){
		if(this.goingDown === true){
			this.yVel += 5;
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	

	// commented out text is using four-corner detection, which is buggy, perhaps to small projectile sizes?
	collide(obj1, obj2) {
		// let obj1TopLeft = {x : obj1.xPos, y: obj1.yPos};
		// let obj1TopRight = { x: obj1.xPos + obj1.width, y: obj1.yPos };
		// let obj1BotLeft = { x: obj1.xPos, y: obj1.yPos + obj1.height };
		// let obj1BotRight = { x : obj1.xPos + obj1.width, y : obj1.yPos + obj1.height};

		
		// let obj2TopLeft = {x : obj2.xPos, y : obj2.yPos};
		// let obj2TopRight = { x: obj2.xPos + obj2.width, y: obj2.yPos };
		// let obj2BotLeft = { x: obj2.xPos, y: obj2.yPos + obj2.height };
		// let obj2BotRight = {x : obj2.xPos + obj2.width, y : obj2.yPos + obj2.height};

		let obj1CenterX = obj1.xPos + (obj1.width / 2);
		let obj1CenterY = obj1.yPos + (obj1.height / 2);
		let obj1Diag = Math.sqrt(Math.pow(obj1.width / 2, 2) + Math.pow(obj1.height / 2, 2));

		let obj2CenterX = obj2.xPos + (obj2.width / 2);
		let obj2CenterY = obj2.yPos + (obj2.height / 2);
		let obj2Diag = Math.sqrt(Math.pow(obj2.width / 2, 2) + Math.pow(obj2.height / 2, 2));

		let totalDelta = Math.sqrt(Math.pow(obj1CenterX - obj2CenterX, 2) + Math.pow(obj1CenterY - obj2CenterY, 2))

		// this is using top right pos, should be using center, but probably doesnt matter
		// let totalDelta = Math.sqrt(Math.pow(obj1.xPos - obj2.xPos, 2) + Math.pow(obj1.yPos - obj2.yPos, 2));

		// let totalDelta = Math.sqrt(Math.pow(obj1CenterX - obj2CenterX))

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

		if(obj1Diag + obj2Diag + 10 > totalDelta) {
			return true;
		} else {
			return false;
		}

	}

	// collidedWithProjectiles() {
	// 	let that = this;
	// 	Object.values(this.computerProjectiles).forEach((p) => {
	// 		if (that.collide(that, p)) {
	// 			debugger;
	// 			p.didHit = true;
	// 			that.alive = false;
	// 		}
	// 	});
	// }

	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------

}