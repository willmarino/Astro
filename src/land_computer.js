import Projectile from "./projectile";


export default class LandComputer{
  constructor(environment, context, human, id){
    this.environment = environment;
    this.context = context;
    this.human = human;
    this.type = 'land-computer';

    if(id % 2 === 0){
      this.curPlat = this.environment.head.next;
      this.nextPlat = this.curPlat.next;
      this.xPos = this.curPlat.xStart + ((this.curPlat.width) / 2);
      this.goingRight = true;
      this.goingLeft = false;
      this.xVel = 6;
    }else{
      this.curPlat = this.environment.tail.prev;
      this.nextPlat = this.curPlat.prev;
      this.xPos = this.curPlat.xStart + ((this.curPlat.width) / 2);
      this.goingRight = false;
      this.goingLeft = true;
      this.xVel = -6;
    }

    this.yPos = this.curPlat.yStart;
    this.yVel = 0;
    this.CONSTANTS = {
      GRAVITY: 0.5,
    };

    this.id = id;

    this.projectileCount = 500 * id;
    this.height = 30;
    this.width = 30;
    this.projectiles = {};
    this.alive = true;
    this.additionalScore = 0;
    this.nextPlat = null;
    this.jumping = false;

    this.initiateShot();
  }

  initiateShot(){
    window.setInterval(() => {
      if(this.alive) this.shoot();
    }, 2000)
  }

  getStartPlatforms(){
    let keys = Object.keys(this.environment.platforms);
    let mid = Math.round(keys.length / 2);
    // let mid = Math.round(this.environment.platforms.length / 2);
    return { left: this.environment.platforms[mid - 1], right: this.environment.platforms[mid + 1]};
  }

  animate(context){
    this.action();
    this.draw(context);
  }

  action(){
    this.move();
  }

  draw(context){
    context.fillStyle = 'purple';
    context.fillRect(this.xPos, this.yPos, this.width, this.height);
  }

  move(){
    this.getCurrentPlatform();
    if(!this.alive){

      this.yVel += this.CONSTANTS.GRAVITY;
      this.yPos += this.yVel;
      return;
      // this.xPos += this.xVel;
    }

    if((this.human.xPos >= 800 && this.human.xVel > 0) || (this.human.xPos <= 300 && this.human.xVel < 0)){
      this.xPos -= this.human.xVel;
    }
    // if(this.curPlat && !this)
    // this.switchDirections();
    if(this.curPlat && !this.jumping){
      this.switchDirections();
      this.yPos = this.curPlat.yStart - this.height;
      this.xPos += this.xVel;
    }
    if(this.isOnEdge()){

      this.beginJump();

      this.jumping = true;
      this.xPos += this.xVel;
      this.yPos += this.yVel;
      this.yVel += this.CONSTANTS.GRAVITY;
    }
    // if you have jumped already
    if(this.jumping){

      // if you have jumped, your yVel is downward, and your ypos is on floor, then land
      if (this.curPlat && this.yPos >= this.curPlat.yStart - this.height && this.yVel > 0){
  
        this.jumping = false;
        this.yPos = this.curPlat.yStart - this.height;
        this.yVel = 0;
        this.xPos += this.xVel;
      // if you are still midjump
      }else{
  
        this.xPos += this.xVel;
        this.yPos += this.yVel;
        this.yVel += this.CONSTANTS.GRAVITY;
      }
    }
  }

  switchDirections(){
    if (this.goingRight && this.human.xPos < this.xPos - 500) {
      this.goingLeft = true;
      this.goingRight = false;
      this.xVel = this.xVel * (-1);
    } else if (this.goingLeft && this.human.xPos > this.xPos + 500){
      this.goingRight = true;
      this.goingLeft = false;
      this.xVel = this.xVel * (-1);
    }
  }

  isOnEdge(){
    if(this.goingLeft){
      if(this.curPlat
        && this.yPos === this.curPlat.yStart - this.height
        && this.xPos <= this.curPlat.xStart + 20){
          return true;
      }
    }else if(this.goingRight){
      if(this.curPlat
        && this.yPos === this.curPlat.yStart - this.height
        && this.xPos >= this.curPlat.xStart + this.curPlat.width - this.width - 10){
          return true;
      }
    }
    return false;
  }

  beginJump(){
    let startX = this.xPos;
    let startY = this.curPlat.yStart;
    let endY = this.nextPlat.yStart;

    let endX;
    if(this.goingRight){
      endX = this.nextPlat.xStart + 10;
    }else if(this.goingLeft){
      endX = this.nextPlat.xStart + this.nextPlat.width - this.width - 10;
    }
    let xDiff = Math.abs(endX - startX);
    
    // steps steps first half, steps steps second half
    // let dist, steps, yvel = this.calculateFall(xDiff / 2);
    let obj = this.calculateFall(xDiff / 2);
    let dist = obj.dist;
    let steps = obj.steps;
    let yVel = obj.yVel;

    // let yVertex = this.nextPlat. + dist;
    if(this.curPlat.yStart <= this.nextPlat.yStart){

      this.yVel = yVel * (-1);
    } else if (this.curPlat.yStart > this.nextPlat.yStart){

      let maxHeight = (this.nextPlat.yStart - this.curPlat.yStart - dist) * (-1);
      this.yVel = this.calculateRise(steps, maxHeight) * (-1);

    }

  }

  calculateRise(steps, maxHeight){
    let roundedSteps = Math.round(steps);
    let count = 0;
    for(let i = 1; i <= roundedSteps; i++){
      count += i;
    }
    let initYvel = (maxHeight + (count * 0.5)) / roundedSteps;
    return initYvel;
  }

  calculateFall(xDiff){
    let steps = Math.abs(Math.round(xDiff / this.xVel));
    let yVel = 0;
    let dist = 0;
    for(let i = 0; i < steps; i++){
      dist += yVel;
      yVel += this.CONSTANTS.GRAVITY;
    }
    return {dist, steps, yVel};
  }

  // edited getCurrentPlatform so that it sets this.curPlat to null if the comp is not above a platform,
  // before it would only set new platforms, not set null for no platforms
  // p.s. never use forEach, it sucks
  getCurrentPlatform(){
    for(let i = 0; i < Object.values(this.environment.platforms).length; i++){
      let platform = Object.values(this.environment.platforms)[i];
      if(this.xPos > platform.xStart && (this.xPos < platform.xStart + platform.width) && (this.yPos <= platform.yStart + this.height)){
        this.curPlat = platform;
        if(this.goingLeft){
          // this.nextPlat = Object.values(this.environment.platforms)[i - 1];
          this.nextPlat = this.curPlat.prev;
        }else if(this.goingRight){
          // this.nextPlat = Object.values(this.environment.platforms)[i + 1];
          this.nextPlat = this.curPlat.next;
        }
        return;
      }
    }
    this.curPlat = null;
    this.nextPlat = null;
  }


  shoot(){
    let newProjectile = new Projectile(
      this, ...this.configureProjectile({x : this.human.xPos, y : this.human.yPos})
    );
    this.projectiles[newProjectile.id] = newProjectile;
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
}