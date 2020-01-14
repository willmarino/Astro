

export default class LandComputer{
  constructor(environment, context, human){
    this.environment = environment;
    this.context = context;
    this.human = human;

    let randNum = Math.random();
    if(randNum > 0.5){
      this.xPos = -500;
      // this.baseXvel = 5;
      this.goingRight = true;
      this.goingLeft = false;
      this.xVel = 10;
    }else{
      this.xPos = 1800;
      // this.baseXvel = -5;
      this.goingLeft = true;
      this.goingRight = false;
      this.xVel = -10;
    }
    
    this.yPos = 100;
    this.yVel = 0;
    this.CONSTANTS = {
      GRAVITY: 0.5,
    };

    this.height = 30;
    this.width = 30;
    this.projectiles = {};
    this.alive = true;
    this.additionalScore = 0;
    this.curPlat = null;
    this.nextPlat = null;
    this.jumping = false;
    this.jumpingYVel = 8;
  }

  animate(context){
    this.action();
    this.draw(context);
    Object.values(this.projectiles).forEach((p) => {
      p.animate(context);
    });
    this.filterProjectiles();
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
    debugger;
    this.getCurrentPlatform();
    if(!this.alive){
      this.yVel += this.CONSTANTS.GRAVITY;
      this.xPos += this.xVel;
    }
    if(this.curPlat && !this.jumping){
      this.yPos = this.curPlat.yPos - this.height;
      this.xPos += this.xVel;
    }
    if(this.isOnEdge()){
      this.beginJump();
      this.jumping = true;
      this.xPos += this.xVel
      this.yPos += this.yVel
      this.yVel -= this.CONSTANTS.GRAVITY;
    }
    if(this.curPlat && this.jumping && this.yPos){

    }
  }

  isOnEdge(){
    if(this.goingLeft){
      if(this.curPlat
        && this.yPos === this.curPlat.yStart - this.height
        && this.xPos === this.curPlat.xStart){
          return true;
      }
    }else if(this.goingRight){
      if(this.curPlat
        && this.yPos === this.curPlat.yStart - this.height
        && this.xPos === this.curPlat.xStart + this.curPlat.width){
          return true;
      }
    }
    return false;
  }

  beginJump(){
    // set local vars for curPlat and nextPlat
    let curPlat = this.curPlat;
    let curPlatIdx = this.environment.platforms.find(p => p === curPlat);
    let nextPlat;
    if(this.goingRight){
      nextPlat = this.environment.platforms[curPlatIdx + 1];
    }else if(this.goingLeft){
      nextPlat = this.environment.platforms[curPlatIdx - 1];
    }
    // heightDiff is height to be jumped
    // maxJumpHeight is lower plat + max height of jump, in context of canvas dimensions
    let heightDiff = Math.abs(curPlat.yStart - nextPlat.yStart) * 1.3
    // set min jump height
    if(heightDiff < 25) heightDiff = 25;
    let maxJumpHeight = (curPlat.yStart < nextPlat.yStart)
      ? curPlat.yStart + heightDiff : nextPlat.yStart + heightDiff;
      // gap btw platforms
    let xGap = this.goingRight
      ? nextPlat.xStart - (curPlat.xStart + curPlat.width)
      : curPlat.xStart - (nextPlat.xStart + nextPlat.width);
    // time jump will take from takeoff to land, in seconds
    let jumpTime = (xGap / this.xVel);
    // let jumpTime = (xGap < heightDiff) ? (heightDiff / this.jumpingYVel) : (xGap / this.xVel);

    // in numSteps number of moves, yVel must go from x to 0
    let halfway = xGap / 2;
    let numSteps = halfway / this.xVel;
    let initYVel = (0 + (0.5) * numSteps) * (-1);
    this.yVel = initYVel;
    // starting y velocity will need to be such that when the computer reaches the maximum of the jump parabola,
    // its y velocity will have decreased to zero due to gravity
  }

  getCurrentPlatform(){
    this.environment.platforms.forEach((platform) => {
      if(this.xPos > platform.xStart && this.xPos < platform.xStart + platform.width){
        this.curPlat = platform;
      }
    });
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