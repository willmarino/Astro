import Projectile from "./projectile";

export default class DynamicComputer{
  constructor(environment, context, human, id, xPos=850){
    this.type = 'computer';

		this.CONSTANTS = {
      GRAVITY: 0.5,
      JETPACK: -0.5
    };

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
    // debugger;
    this.configureProjectiles();
    // debugger;
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