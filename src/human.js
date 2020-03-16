import Projectile from "./projectile";
import Shield from "./powerups/shield/shield";
import ShieldAttachment from "./powerups/shield/shield_attachement";
import HealthBarContainer from './health_bar_container';
import ShieldBarContainer from "./powerups/shield/shield_bar_container";

import BarContainer from './powerups/bar/bar_container';
import Bar from './powerups/bar/bar';

export default class Human{
	constructor(environment, context, computerProjectiles, humanStartPlatform){
		this.type = 'human';

		this.CONSTANTS = {
			GRAVITY: 0.5,
			NORMALFORCE: -0.5
		};
		
		this.hsp = humanStartPlatform;
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

    // this.xPos = 350;
		// this.yPos = 100;
		this.xPos = this.hsp.xStart + (Math.round(Math.random() * this.hsp.width));
		debugger;
		this.yPos = this.hsp.yStart;
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

		this.powerups = {};
		this.shielded = false;
		this.shield = null;
		this.shieldInterval = null;

		this.health = 3;
		this.healthBarContainer = new HealthBarContainer(3, 10 , 10, 80, 10, this.goingRight);
		this.shieldBarContainer = null;
		this.invincible = false;

		// this.barContainer = new BarContainer(10, 100, 10000);
		this.barContainer = null;

		this.shootingMode = 'normal';
		// this.shootingMode = 'triple';
		this.tripleShotCount = 0;

    this.setClick = this.setClick.bind(this);
		this.allBinds();
	}
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------MAIN---------------------------------------------------
	// ----------------------------------MAIN--------------------------------------------------------------
	// ----------------------------------MAIN--------------------------------------------------------------
	// ----------------------------------MAIN--------------------------------------------------------------
	// ----------------------------------MAIN--------------------------------------------------------------
	// ----------------------------------MAIN--------------------------------------------------------------


	animate(context) {
		this.move();
		this.draw(context);
		if(this.shielded){
			this.shield.animate(context);
		}
		this.healthBarContainer.health = this.health;
		this.healthBarContainer.animate(context, 10, 10);
		if(this.shielded) this.shieldBarContainer.animate(context);
		if(this.shootingMode === 'triple') this.barContainer.animate(context);
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
			if(Math.abs(this.xVel) < 0.5){
				this.xVel = 0;
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
		// let that = this;
		for (let i = 0; i < Object.values(this.environment.platforms).length; i++) {
			let plat = Object.values(this.environment.platforms)[i];
			if (this.xPos > plat.xStart && this.xPos < plat.xStart + plat.width && this.yPos < plat.yStart + plat.height) {
				
				this.curPlat = plat;
				this.lastPlat = this.curPlat;
				break;
			} else {
				
				this.curPlat = null;
				// this.onFloor = false;
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
	allBinds(){
		this.bindLeft();
		this.bindRight();
		this.bindUndoRight();
		this.bindUndoLeft();
		this.bindDown();
		this.bindUndoDown();
		this.bindDash();
		this.bindUseShield();
		this.bindInvincibility();
		this.bindTripleShot();
    this.bindJump();
    // this.setClick = this.setClick.bind(this);
    this.setClick(this);
	}

	bindLeft() {
		window.addEventListener('keypress', (e) => {
			if (e.key === 'a' || e.key === 'A') {
				this.moveLeft();
				this.movingLeft = true;
				this.movingRight = false;
			}
		});
	}

	bindUndoLeft(){
		window.addEventListener('keyup', (e) => {
			if (e.key === 'a' || e.key === 'A') {
				// this.moveLeft();
				this.movingLeft = false;
			}
		});
	}

	bindRight(){
		window.addEventListener('keypress', (e) => {
			if (e.key === 'd' || e.key === 'D') {
				this.moveRight();
				this.movingRight = true;
				this.movingLeft = false;
			}
		});
	}

	bindUndoRight(){
		window.addEventListener('keyup', (e) => {
			if (e.key === 'd' || e.key === 'D') {
				// this.moveRight();
				this.movingRight = false;
			}
		});
	}

	bindJump() {
		window.addEventListener('keypress', (e) => {
			if (e.key === 'w' || e.key === 'W') {
				this.jump();
			}
		});
	}

	bindDown(){
		window.addEventListener('keypress', (e) => {
			if(e.key === 's' || e.key === 'S'){
				this.goingDown = true;
				this.down();
			}
		});
	}

	bindUndoDown(){
		window.addEventListener('keyup', (e) => {
			if (e.key === 's' || e.key === 'S') {
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

	bindUseShield(){
		window.addEventListener('keypress', (e) => {
			if(e.key === 'r' || e.key === 'R'){
				this.shielded = false;
				this.shield = null;
				this.useShield();
				// this.shieldBarContainer = new ShieldBarContainer();
				this.shieldBarContainer = new BarContainer(10, 50, 5000);
			}
		})
	}

	bindInvincibility(){
		window.addEventListener('keypress', (e) => {
			if(e.key === 'p' || e.key === 'P'){
				this.invincible = true;
			}
		})
	}

	bindTripleShot(){
		window.addEventListener('keypress', (e) => {
			if(e.key === 'c' || e.key === 'C'){
				this.useTripleShot();
				this.barContainer = new BarContainer(10, 80, 10000);
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
			// let rect = this.context.canvas.getBoundingClientRect();
			// let pos = {};
			// pos.x = e.clientX - rect.left;
			// pos.y = e.clientY - rect.top;

			// let newProj = new Projectile(that, ...that.configureProjectile(pos));
			// let newId = newProj.id;
			// that.projectiles = Object.assign({[newId]: newProj}, that.projectiles);

			// this.projectileCount += 1;
			if(that.shootingMode === 'normal'){
				this.shoot(e);
			}else if(that.shootingMode === 'triple'){
				let tripleShooting = window.setInterval(() => {
					this.shoot(e);
					this.tripleShotCount += 1;
					if(this.tripleShotCount === 3){
						this.tripleShotCount = 0;
						window.clearInterval(tripleShooting);
					}
				}, 50);
			}

		});
	}

	shoot(e){
		let rect = this.context.canvas.getBoundingClientRect();
		let pos = {};
		pos.x = e.clientX - rect.left;
		pos.y = e.clientY - rect.top;

		let newProj = new Projectile(this, ...this.configureProjectile(pos));
		let newId = newProj.id;
		this.projectiles = Object.assign({[newId]: newProj}, this.projectiles);

		this.projectileCount += 1;
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
			this.yVel += 7;
		}
	}

	useShield(){
		let shield = this.hasPowerup('shield');
		if(shield){
			window.clearInterval(this.shieldInterval);
			this.shielded = true;
			this.shield = new ShieldAttachment(this);
			delete this.powerups[shield.id];
			this.shieldInterval = window.setTimeout(() => {
				this.shielded = false;
				this.shield = null;
				window.clearInterval(this.shieldInterval);
			}, 5000)
		}
	}

	useTripleShot(){
		let powerup = this.hasPowerup('tripleshot');
		if(powerup){
			delete this.powerups[powerup.id];
			this.shootingMode = 'triple';
			let that = this;
			window.setTimeout(() => {
				that.shootingMode = 'normal';
			}, 10000)
		}
	}

	hasPowerup(type){
		let powerups = Object.values(this.powerups);
		for(let i = 0; i < powerups.length; i++){
			if(powerups[i].type === type){
				return powerups[i];
			}
		}
		return false;
	}

}