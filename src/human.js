import Projectile from "./projectile";

export default class Human{
	constructor(environment, context, computerProjectiles){

		this.CONSTANTS = {
      GRAVITY: 0.5
		};

		this.alive = true;

		this.environment = environment;
		this.context = context;

		this.computerProjectiles = computerProjectiles;

		this.projectiles = [];

		this.jumping = false;

    this.xPos = 350;
    this.yPos = 100;
    this.yVel = 0;
    this.xVel = 0;
    this.width = 10;
		this.height = 10;
		
		this.onFloor = false;
		this.curPlat = null;
		this.lastPlat = this.environment.platforms[0];

		this.bindLeft();
		this.bindRight();
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
		this.projectiles = this.projectiles.filter(p => p.xPos < 810 && p.xPos > -10 && p.yPos > -10 && p.yPos < 410);
	}

	draw(context) {
		context.fillStyle = 'gray';
		context.fillRect(
			this.xPos, this.yPos, this.width, this.height
		);
	}

	move(){
		debugger;
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
			if ((this.xPos >= 600 && this.xVel >= 0) || (this.xPos <= 200 && this.xVel <= 0)) {
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
					if ((this.xPos >= 600 && this.xVel >= 0) || (this.xPos <= 200 && this.xVel <= 0)) {
						null;
					} else {
						this.xPos += this.xVel;
					}
					// 
					return;
				}
			}
			this.yVel += this.CONSTANTS.GRAVITY;
			this.yPos += this.yVel;
			// 
			if ((this.xPos >= 600 && this.xVel >= 0) || (this.xPos <= 200 && this.xVel <= 0)) {
				null;
			} else {
				this.xPos += this.xVel;
			}
			// 
		}else if(this.onFloor && this.jumping){ // on floor but jumping	
			this.yPos += this.yVel;
			// 
			if ((this.xPos >= 600 && this.xVel >= 0) || (this.xPos <= 200 && this.xVel <= 0)) {
				null;
			} else {
				this.xPos += this.xVel;
			}
			// 
		}
		if(this.xVel > 0){
			this.xVel -= .1;
		}else if(this.xVel < 0){
			this.xVel += .1;
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

	bindRight() {
		window.addEventListener('keypress', (e) => {
			if (e.key === 'a') {
				this.moveLeft();
			}
		});
	}

	bindLeft(){
		window.addEventListener('keypress', (e) => {
			if (e.key === 'd') {
				this.moveRight();
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

	setClick(that) {
		this.context.canvas.addEventListener('click', (e) => {
			let rect = this.context.canvas.getBoundingClientRect();
			let pos = {};
			pos.x = e.clientX - rect.left;
			pos.y = e.clientY - rect.top;
	
			// 
			that.projectiles.push(new Projectile(
				{ xPos: that.xPos, yPos: that.yPos}, 
				that.context,
				...that.configureProjectile(pos)
				)
			);
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
		this.yVel -= 10;
	}

	moveRight(){
		if(this.xVel < 0){
			this.xVel = 0;
		}
		this.xVel += 4;
		if(this.xVel >= 5){
			this.xVel = 5;
		}
	}

	moveLeft() {
		if (this.xVel > 0) {
			this.xVel = 0;
		}
		this.xVel -= 4;
		if (this.xVel <= -5) {
			this.xVel = -5;
		}
	}

	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	// ----------------------------------------------------------------------------------------------------
	
}