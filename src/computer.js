import Projectile from "./projectile";

export default class Computer{
  constructor(environment, context, human, xPos=850){
    this.type = 'computer';

		this.CONSTANTS = {
      GRAVITY: 0.5,
      JETPACK: 0.5
    };

    this.alive = true;
		this.environment = environment;
    this.context = context;
    this.projectiles = {};
    this.humanProjectiles = human.projectiles;

    this.additionalScore = 0;

    this.projectileCount = 10000;
    this.projectilesToDelete = [];

		this.xPos = xPos;
    this.yPos = 50;
		this.yVel = 0;
		this.xVel = -5;
		this.width = 30;
    this.height = 30;
    
    this.human = human;

    this.canShoot = false;
    this.initiateShot();

	}

  // ------------------------------------------------------------

  initiateShot(){
    window.setInterval(() => {
      this.shoot();
    }, 1500);
  }

  switchDirection(){
    if(this.xPos <= 20){
      this.xVel = 5;
    }else if(this.xPos >= 1080){
      this.xVel = -5;
    }
  }

  fetchHumanPosition(){
    this.playerPosX = this.human.xPos;
    this.playerPosY = this.human.yPos;
  }

  shoot(){
    let pos = {};
    pos.x = this.playerPosX;
    pos.y = this.playerPosY;

    let newProj;
    
    let randNum = Math.round(Math.random() * 10);
    if(randNum >= 9){
      newProj = (
        new Projectile(
          this,
          ...this.configureProjectile(pos),
          true
        )
      );
    }else{
      newProj = (
        new Projectile(
          this,
          ...this.configureProjectile(pos)
        )
      );
    }
        
    this.projectiles[newProj.id] = newProj;
    this.projectileCount += 1;
  }

	configureProjectile(pos, homing=false){
    let randNum = Math.random();
    
    let xDelta = pos.x - this.xPos;
    let yDelta = pos.y - this.yPos;

    if(homing === false){
      let randOffset = Math.round(Math.random() * 200);
      if(randNum < 0.5){
        xDelta += randOffset;
      }else{
        xDelta -= randOffset;
      }
    }

    let squaredDeltaX = Math.pow(xDelta, 2);
    let squaredDeltaY = Math.pow(yDelta, 2);
    let totalDeltasquared = squaredDeltaX + squaredDeltaY;
    let totalDelta = Math.sqrt(totalDeltasquared);

    let proportion = 7.5 / totalDelta;
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
    this.fetchHumanPosition();
    if(this.alive){
      this.switchDirection();
      this.collidedWithProjectiles();
    }
  }

  move(){
    if(!this.alive){
      this.yVel += this.CONSTANTS.GRAVITY;
      this.yPos += this.yVel;
    }else{
      this.yPos += this.yVel;
      this.xPos += this.xVel;
      if(this.collidedWithFloor() !== true){
        this.yVel += this.CONSTANTS.GRAVITY;
        this.yVel -= this.CONSTANTS.JETPACK;
      }
      if(this.xVel > 0 && this.collidedWithFloor()){
        this.xVel -= 0.1;
      } else if (this.xVel < 0 && this.collidedWithFloor()){
        this.xVel += 0.1;
      }
    }
    if(this.human.xPos >= 800){
      if(this.xVel <= 0){
        this.xPos -= 1;
      }
    }else if(this.human.xPos <= 300){
      if (this.human.xPos <= 300){
        this.xPos += 1;
      }
    }
  }
  // ------------------------------------------------------------
  animate(context){
    this.action();
    this.draw(context);
    if(Object.values(this.projectiles).length > 0){
      Object.values(this.projectiles).forEach((p) => {
        if(p.homing === true){
          let pos = {x: this.human.xPos, y: this.human.yPos};
          p.animate(context, ...this.configureProjectile(pos, true));
        }else{
          p.animate(context);
        }
      });
    }
    // this.projectiles = this.projectiles.filter(p => p.xPos < 1110 && p.xPos > -10 && p.yPos > -10 && p.yPos < 410);
    Object.values(this.projectiles).forEach((p) => {
      if (!(p => p.xPos < 1110 && p.xPos > -10 && p.yPos > -10 && p.yPos < 710)){
        delete this.projectiles[p.id];
      }
    });
  }
  // ------------------------------------------------------------
  collidedWithFloor(){
    if(this.yPos >= this.environment.height - 13){
      this.yVel = 0;
      return true;
    }
  }

  collide(obj1, obj2){
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
    
    
    if(obj1Diag + obj2Diag + 10 > totalDelta){
      return true;
    }else{
      return false;
    }

  }

  collidedWithProjectiles(){
    this.human.projectiles.forEach((hp) => {
      if(this.collide(this, hp)){
        this.projectilesToDelete.push(hp);
        console.log('hit!');
        hp.didHit = true;
        this.alive = false;
        this.additionalScore += 1;
        return true;
      }
    });
  }


}