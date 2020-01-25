import Projectile from "./projectile";

export default class Computer{
  constructor(environment, context, human, id, xPos=850){
    this.type = 'sentry';

		this.CONSTANTS = {
      GRAVITY: 0.5,
      JETPACK: -0.5
    };

    this.alive = true;
		this.environment = environment;
    this.context = context;
    this.projectiles = {};
    // this.humanProjectiles = human.projectiles;

    // this.additionalScore = 0;
    this.projectileCount = 10000 + (id * 100);
    this.id = id;

		this.xPos = xPos;
    this.yPos = 100;
		this.yVel = 0;
		this.xVel = -5;
		this.width = 30;
    this.height = 30;
    
    this.human = human;

    // this.canShoot = false;
    // this.initiateShot();

	}

  // ------------------------------------------------------------

  initiateShot(){
    window.setInterval(() => {
      if(this.alive) this.shoot();
    }, 2000);
  }

  switchDirection(){
    if(this.xPos <= 20){
      this.xVel = 5;
    }else if(this.xPos >= 1080){
      this.xVel = -5;
    }
  }

  shoot(){
    let pos = {};
    pos.x = this.human.xPos;
    pos.y = this.human.yPos;

    let newProj;
    
    let randNum = Math.round(Math.random() * 10);
    if(randNum >= 8){
      newProj = (
        new Projectile(
          this,
          ...this.configureProjectile(pos),
          true,
          this.human
        )
      );
    }else{
      newProj = (
        new Projectile(
          this,
          ...this.configureProjectile(pos),
          false,
          this.human
        )
      );
    }
        
    this.projectiles[newProj.id] = newProj;
    this.projectileCount += 1;
  }

	configureProjectile(pos, homing=false, projectile=null){
    let randNum = Math.random();
    
    let xDelta;
    let yDelta;

    // if projectile is homing, we need to call this method and compare the projectile's
    // current position with that of the human player, else we are comparing the player and the computer
    if(homing === false){
      xDelta = pos.x - this.xPos;
      yDelta = pos.y - this.yPos;
    }else if(homing === true){
      xDelta = pos.x - projectile.xPos;
      yDelta = pos.y - projectile.yPos;
    }

    if(homing === false){
      let randOffset = Math.round(Math.random() * 200);
      if(randNum < 0.25){
        xDelta += randOffset;
      }else if(randNum > 0.25 && randNum < 0.5){
        xDelta -= randOffset;
      }
    }

    let squaredDeltaX = Math.pow(xDelta, 2);
    let squaredDeltaY = Math.pow(yDelta, 2);
    let totalDeltasquared = squaredDeltaX + squaredDeltaY;
    let totalDelta = Math.sqrt(totalDeltasquared);

    let proportion;
    if(projectile === null){
      proportion = 5 / totalDelta;
    }else{
      proportion = 3 / totalDelta;
    }
    let xVel = xDelta * proportion;
    let yVel = yDelta * proportion;

    return [xVel, yVel];
  }


  // ------------------------------------------------------------

  jump(){
    this.yVel -= 5;
  }

  moveRight(){
    this.xVel += 2;
    if(this.xVel > 5){
      this.xVel = 5;
    }
  }

  moveLeft() {
    this.xVel -= 2;
    if (this.xVel < -5) {
      this.xVel = -5;
    }
	}
  // ------------------------------------------------------------

	draw(context){
    context.fillStyle = 'red';
    context.fillRect(
      this.xPos, this.yPos, this.width, this.height
    );
  }

  action(){
    this.move();
    if(this.alive){
      this.switchDirection();
    }
  }

  move(){
    if(!this.alive){
      this.yVel += this.CONSTANTS.GRAVITY;
      this.yPos += this.yVel;
      this.xPos += this.xVel;
    }else{
      this.xPos += this.xVel;
      this.yVel += this.CONSTANTS.GRAVITY;
      this.yVel += this.CONSTANTS.JETPACK;
      this.yPos += this.yVel;
    }
  }
  // ------------------------------------------------------------
  // animate(context, human){
  animate(context){
    this.action();
    this.draw(context);
  }

}