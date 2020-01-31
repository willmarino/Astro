import Projectile from "./projectile";
import HealthBarContainer from './health_bar_container';

export default class DynamicComputer{
  constructor(environment, context, human, id, xPos=850){
    this.type = 'computer';

		this.CONSTANTS = {
      GRAVITY: 0.5,
      JETPACK: -0.5
    };

    this.moving = true;

    this.alive = true;
		this.environment = environment;
    this.context = context;
    this.projectiles = {};
    this.humanProjectiles = human.projectiles;

    this.additionalScore = 0;
    this.projectileCount = 15000 + (id * 100);
    this.id = id;
    this.health = 2;

		this.xPos = xPos;
    this.yPos = 100;
		this.yVel = 0;
		this.xVel = 5;
		this.width = 30;
    this.height = 30;
    this.healthBarContainer = new HealthBarContainer(2, this.xPos , this.yPos - 30, this.width, 10, this.goingRight);
    
    this.stepNum = 0;
    
    this.human = human;


	}

  // ------------------------------------------------------------

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
      let newProj = new Projectile(
        this,
        ...this.configureProjectile(i, totalVel),
        false,
        this.human
      );
      this.projectiles[newProj.id] = newProj;
      this.projectileCount += 1;
    }
  }

  configureProjectile(num, totalVel){
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

  // jump(){
  //   this.yVel -= 5;
  // }

  // moveRight(){
  //   this.xVel += 2;
  //   if(this.xVel > 5){
  //     this.xVel = 5;
  //   }
  // }

  // moveLeft() {
  //   this.xVel -= 2;
  //   if (this.xVel < -5) {
  //     this.xVel = -5;
  //   }
  // }


  configureMove(){
    this.shoot()
    let that = this;
    window.setTimeout(() => {
      let xConfig = that.configure(that.xPos, 100, 1000, 100);
      let yConfig = that.configure(that.yPos, 50, 300, 50);
      that.xVel = xConfig / 10;
      that.yVel = yConfig / 10;
      that.moving = true;
    }, 1000)
  }

  configure(startPos, d, upperBound, lowerBound){
    let end;
    let diff;
    if(startPos > (0.75 * upperBound)){
      end = (upperBound / 2) - (Math.random() * d);
      diff = (startPos - end) * (-1);
    }else if(startPos < upperBound / 2){
      end = (upperBound / 2) + (Math.random() * d);
      diff = end - startPos;
    }else{
      diff = d + (Math.random() * d);
    }
    return diff;
  }

  // ------------------------------------------------------------
  animate(context){
    this.action();
    this.draw(context);
    this.healthBarContainer.health = this.health;
    this.healthBarContainer.animate(context, this.xPos, this.yPos - 30);
  }

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
    this.goingRight = (this.xVel >= 0) ? true : false;
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

  move3(){
    if(!this.alive){
      this.yVel += this.CONSTANTS.GRAVITY;
      this.yPos += this.yVel;
    }else if(!this.moving){
      if(this.stepNum === 9){
        this.stepNum = 0;
        this.movement.configuringMove = true;
        this.configureMove();
      }else{
        this.yPos += this.yVel;
        this.xPos += this.xVel;
        this.stepNum += 1;
      }
    }else{
      if(this.isPlayerOnEdge()){
        this.xPos += (this.human.xVel * (-1));
      }
    }
  }
  // if comp is not alive, then apply gravity and move
  // if stepnum is not at 9, apply x and y vel
  // if stepnum is at 9, configure move and set stepnum to 0
  onScreen(){
      if(this.xPos < 0 || this.xPos > 1100){
        return false;
      }else{
        return true;
      }
  }

  move(){
    if(!this.alive){
      this.yVel += this.CONSTANTS.GRAVITY;
      this.yPos += this.yVel;
    }else if(!this.moving){
      this.xVel = 0;
      this.yVel = 0;
      if(this.isPlayerOnEdge() && this.onScreen()){
        this.xPos += this.human.xVel * (-1);
      }
    }else{
      if(this.stepNum === 9){
        this.moving = false;
        this.stepNum = 0;
        this.configureMove();
      }else{
        this.xPos += this.xVel;
        this.yPos += this.yVel;
        this.stepNum += 1;
      }
    }
  }

  isPlayerOnEdge(){
    return (this.human.xPos >= 800 || this.human.xPos <= 300);
  }

}