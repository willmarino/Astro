import Player from './player';
import Projectile from "./projectile";

export default class Computer{
  constructor(environment, context, human, xPos=850){

		this.CONSTANTS = {
      GRAVITY: 0.5,
      JETPACK: 0.5
    };

		this.environment = environment;
    this.context = context;

    this.projectiles = [];

		this.xPos = xPos;
		this.yPos = 50;
		this.yVel = 0;
		this.xVel = -5;
		this.width = 10;
    this.height = 10;
    
    this.human = human;
		
	}

  // ------------------------------------------------------------

  switchDirection(){
    if(this.xPos <= 20){
      this.xVel = 5;
    }else if(this.xPos >= 780){
      this.xVel = -5;
    }
  }

  fetchHumanPosition(){
    this.playerPosX = this.human.xPos;
    this.playerPosY = this.human.yPos;
  }

  shoot(){
    // let rect = this.context.canvas.getBoundingClientRect();
    let pos = {};
    pos.x = this.playerPosX;
    pos.y = this.playerPosY;


    this.projectiles.push(new Projectile(
      { xPos: this.xPos, yPos: this.yPos },
      this.context,
      ...this.configureProjectile(pos)
    )
    );
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
    this.shoot();
    this.switchDirection();
  }

  move(){
    this.yPos += this.yVel;
    this.xPos += this.xVel;
    if(this.collided() !== true){
      this.yVel += this.CONSTANTS.GRAVITY;
      this.yVel -= this.CONSTANTS.JETPACK;
    }
    if(this.xVel > 0 && this.collided()){
      this.xVel -= 0.1;
    } else if (this.xVel < 0 && this.collided()){
      this.xVel += 0.1;
    }
  }
  // ------------------------------------------------------------
  animate(context){
    this.action();
    this.draw(context);
    if(this.projectiles.length > 0){
      this.projectiles.forEach((p) => {
        p.animate(context);
      });
    }
    this.projectiles = this.projectiles.filter(p => p.xPos < 810 && p.xPos > -10 && p.yPos > -10 && p.yPos < 410);
  }
  // ------------------------------------------------------------
  collided(){
    if(this.yPos >= this.environment.height - 13){
      this.yVel = 0;
      return true;
    }
  }


}