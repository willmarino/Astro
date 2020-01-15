

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
      this.xVel = 3;
    }else{
      this.xPos = 1800;
      // this.baseXvel = -5;
      this.goingLeft = true;
      this.goingRight = false;
      this.xVel = -3;
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
    this.jumping = true;
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
    // debugger;
    this.getCurrentPlatform();
    if(!this.alive){
      // debugger;
      this.yVel += this.CONSTANTS.GRAVITY;
      this.yPos += this.yVel;
      return;
      // this.xPos += this.xVel;
    }
    this.switchDirections();
    if(this.curPlat && !this.jumping){
      // debugger;
      this.yPos = this.curPlat.yStart - this.height;
      this.xPos += this.xVel;
    }
    if(this.isOnEdge()){
      // debugger;
      this.beginJump();
      this.jumping = true;
      this.xPos += this.xVel;
      this.yPos += this.yVel;
      this.yVel += this.CONSTANTS.GRAVITY;
    }
    // if you have jumped already
    if(this.jumping){
      // debugger;
      // if you have jumped, your yVel is downward, and your ypos is on floor, then land
      if (this.curPlat && this.yPos >= this.curPlat.yStart - this.height && this.yVel > 0){
        // debugger;
        this.jumping = false;
        this.yPos = this.curPlat.yStart - this.height;
        this.yVel = 0;
        this.xPos += this.xVel;
      // if you are still midjump
      }else{
        // debugger;
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
      this.xVel = -3;
    } else if (this.goingLeft && this.human.xPos > this.xPos + 500){
      this.goingRight = true;
      this.goingLeft = false;
      this.xVel = 3;
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
        && this.xPos >= this.curPlat.xStart + this.curPlat.width - this.width - 20){
          return true;
      }
    }
    return false;
  }

  beginJump(){
    // set local vars for curPlat and nextPlat
    let curPlat = this.curPlat;
    let curPlatIdx = this.environment.platforms.indexOf(curPlat);
    let nextPlat = this.nextPlat;
    // debugger;
    // heightDiff is height to be jumped
    // maxJumpHeight is lower plat + max height of jump, in context of canvas dimensions
    let heightDiff = Math.abs(curPlat.yStart - nextPlat.yStart) * 1.3;
    // set min jump height
    if(heightDiff < 25) heightDiff = 25;
    // set max jump height on canvas dimensions according to which plat is lower
    let maxJumpHeight = (curPlat.yStart < nextPlat.yStart)
      ? curPlat.yStart + heightDiff : nextPlat.yStart + heightDiff;
      // gap btw platforms
    let xGap = this.goingRight
      // ? nextPlat.xStart - (curPlat.xStart + curPlat.width)
      ? nextPlat.xStart - this.xPos
      : this.xPos - (nextPlat.xStart + nextPlat.width);
    // time jump will take from takeoff to land, in seconds
    let jumpTime = (xGap / this.xVel);
    // let jumpTime = (xGap < heightDiff) ? (heightDiff / this.jumpingYVel) : (xGap / this.xVel);


    // in numSteps number of moves, yVel must go from x to 0
    let halfway = xGap / 2;
    let numSteps = halfway / this.xVel;

    // fallingDist is the distance that the comp will fall after yvel is 0
    // the minimum vertical distance is has to travel btw maxima and plat



    let initYVel = (0 + (0.5) * numSteps) * (-1);
    this.yVel = initYVel;
    // debugger;
    // starting y velocity will need to be such that when the computer reaches the maximum of the jump parabola,
    // its y velocity will have decreased to zero due to gravity
  }

  beginJump2(){
    let startX = this.xPos;
    let startY = this.curPlat.yStart;
    let endY = this.nextPlat.yStart;

    let endX;
    if(this.goingRight){
      endX = this.nextPlat.xStart + this.width + 10;
    }else if(this.goingLeft){
      endX = this.nextPlat.xStart + this.nextPlat.width - this.width - 10;
    }

    let xDiff = Math.abs(endX - startX);
    
    // steps steps first half, steps steps second half
    let dist, steps, yvel = this.fallingDistance(xDiff / 2);

    let yVertex = this.nextPlat + dist;

    if(this.curPlat.yStart >= this.nextPlat.yStart){
      this.yVel = yvel * (-1);
    } else if (this.curPlat.yStart < this.nextPlat.yStart){
      this.maxHeight = this.nextPlat + dist;
      // let 
    }

  }

  fallingDistance(xDiff){
    let steps = Math.round(xDiff / this.xVel);
    let yVel = 0;
    let dist = 0;
    for(let i = 0; i < steps; i++){
      dist += yVel;
      yvel += this.CONSTANTS.GRAVITY;
    }
    return [dist, steps, yvel];
  }

  // edited getCurrentPlatform so that it sets this.curPlat to null if the comp is not above a platform,
  // before it would only set new platforms, not set null for no platforms
  // p.s. never use forEach, it sucks
  getCurrentPlatform(){
    // this.environment.platforms.forEach((platform) => {
    //   if(this.xPos > platform.xStart && this.xPos < platform.xStart + platform.width){
    //     this.curPlat = platform;
    //   }
    // });
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