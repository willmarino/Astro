import Projectile from "./projectile";

export default class DynamicComputer{
  constructor(environment, context, human, id, xPos=850){
    this.type = 'computer';

		this.CONSTANTS = {
      GRAVITY: 0.5,
      JETPACK: -0.5
    };

    this.movement = {
      configuringMove: false
    }

    this.alive = true;
		this.environment = environment;
    this.context = context;
    this.projectiles = {};
    this.humanProjectiles = human.projectiles;

    this.additionalScore = 0;
    this.projectileCount = 15000 + (id * 100);
    this.id = id;

		this.xPos = xPos;
    this.yPos = 100;
		this.yVel = 0;
		this.xVel = -5;
		this.width = 30;
    this.height = 30;
    
    this.stepNum = 0;
    
    this.human = human;

    this.canShoot = false;
    this.initiateShot();

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
    this.configureProjectiles();
  }

	configureProjectiles(){
    let totalVel = 5;

    for(let i = 0; i < 8; i++){
      // debugger;
      let newProj = new Projectile(
        this,
        ...this.configureProjectile(i, totalVel),
        false,
        this.human
      );
      this.projectiles[newProj.id] = newProj;
      this.projectileCount += 1;
      // debugger;
    }
  }

  configureProjectile(num, totalVel){
    // debugger;
    let xVel;
    let yVel;
    if(num % 2 === 0){
      switch(num){
        case 0:
          xVel = 0;
          yVel = totalVel * (-1);
          break;
        case 2:
          xVel = totalVel;
          yVel = 0;
          break;
        case 4:
          xVel = 0;
          yVel = totalVel;
          break;
        case 6:
          xVel = totalVel * (-1);
          yVel = 0;
          break;
      }
    }else{
      // let balancedVel = Math.sqrt(2 * Math.pow(totalVel, 2));
      let balancedVel = totalVel / 2;
      switch(num){
        case 1:
          xVel = balancedVel;
          yVel = balancedVel * (-1);
          break;
        case 3:
          xVel = balancedVel;
          yVel = balancedVel;
          break;
        case 5:
          xVel = balancedVel * (-1);
          yVel = balancedVel;
          break;
        case 7:
          xVel = balancedVel * (-1);
          yVel = balancedVel * (-1);
          break;
      }
    }

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


  configureMove(){
    window.setTimeout(() => {
      let xConfig = this.configure(this.xPos, 200, 1100, 0);
      let yConfig = this.configure(this.yPos, 50, 700, 0);
      this.xVel = xConfig.diff / 10;
      this.yVel = yConfig.diff / 10;
      this.movement.configuringMove = false;
    }, 1000)
  }

  configure(startPos, d, upperBound, lowerBound){
    let randNum = Math.random();
    let diff = d + (Math.random() * d);
    if(randNum < 0.5) diff *= (-1);
    let end = startPos + diff;
    if(end > upperBound || end < lowerBound){
      diff *= (-1);
    }
    return {end, diff};
  }

  // ------------------------------------------------------------

	draw(context){
    context.fillStyle = 'black';
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

  move2(){
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

  move(){
    if(!this.alive){
      this.yVel += this.CONSTANTS.GRAVITY;
      this.yPos += this.yVel;
    }else if(!this.movement.configuringMove){
      if(this.stepNum === 9){
        this.stepNum = 0;
        this.movement.configuringMove = true;
        this.configureMove();
      }else{
        this.yPos += this.yVel;
        this.xPos += this.xVel;
        this.stepNum += 1;
      }
    }
  }
  // ------------------------------------------------------------
  animate(context){
    this.action();
    this.draw(context);
  }

}