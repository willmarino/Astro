import Projectile from "./projectile";


export default class LandComputer{
  constructor(environment, context, human, id){
    this.environment = environment;
    this.context = context;
    this.human = human;

    let positions = this.getStartPlatforms();

    // let randNum = Math.random();
    if(id % 2 === 0){
      this.xPos = positions.left.xStart + ((positions.left.width / 2));
      this.goingRight = true;
      this.goingLeft = false;
      this.xVel = 4;
    }else{
      this.xPos = positions.right.xStart + ((positions.right.width / 2));
      this.goingLeft = true;
      this.goingRight = false;
      this.xVel = -4;
    }
    this.getCurrentPlatform();
    this.yPos = this.curPlat.yStart;
    this.yVel = 0;
    this.CONSTANTS = {
      GRAVITY: 0.5,
    };

    this.projectileCount = 500 * id;
    this.height = 30;
    this.width = 30;
    this.projectiles = {};
    this.alive = true;
    this.additionalScore = 0;
    this.curPlat = null;
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
    let mid = Math.round(this.environment.platforms.length / 2);
    return { left: this.environment.platforms[mid - 1], right: this.environment.platforms[mid + 1]};
  }

  animate(context){
    this.action();
    this.draw(context);
    Object.values(this.projectiles).forEach((p) => {
      p.animate(context);
    });
    // this.filterProjectiles();
  }

  action(){
    this.move();
    // this.fetchHumanPosition();
    if(this.alive){
      this.collidedWithProjectiles();
    }
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

    this.switchDirections();
    if(this.curPlat && !this.jumping){

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
      this.xVel = -4;
    } else if (this.goingLeft && this.human.xPos > this.xPos + 500){
      this.goingRight = true;
      this.goingLeft = false;
      this.xVel = 4;
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
    for(let i = 0; i < this.environment.platforms.length; i++){
      let platform = this.environment.platforms[i];
      if(this.xPos > platform.xStart && (this.xPos < platform.xStart + platform.width)){
        this.curPlat = platform;
        if(this.goingLeft){
          this.nextPlat = this.environment.platforms[i - 1];
        }else if(this.goingRight){
          this.nextPlat = this.environment.platforms[i + 1];
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
    debugger;
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


  filterProjectiles(){
    Object.values(this.projectiles).forEach((p) => {
      if (!(p => p.xPos < 1110 && p.xPos > -10 && p.yPos > -10 && p.yPos < 710)) {
        delete this.projectiles[p.id];
      }
    });
  }

  collidedWithProjectiles(){
    Object.values(this.human.projectiles).forEach((hp) => {
      if (this.collide(this, hp)) {
        hp.didHit = true;
        this.alive = false;
        this.additionalScore += 1;
        return true;
      }
    });
  }

  collide(obj1, obj2) {
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


    if (obj1Diag + obj2Diag + 10 > totalDelta) {
      return true;
    } else {
      return false;
    }

  }
}