

export default class LandComputer{
  constructor(environment, context, human){
    this.environment = environment;
    this.context = context;
    this.human = human;

    let randNum = Math.random();
    if(randNum > 0.5){
      this.xPos = -500;
    }else{
      this.xPos = 1800;
    }
    
    this.yPos = 100;
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
    this.jumping = null;
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
    this.fillStyle('purple');
    this.fillRect(this.xPos, this.yPos, this.width, this.height);
  }

  move(){
    this.getCurrentPlatform();
    if(!this.alive){
      this.yVel += this.CONSTANTS.GRAVITY;
    }
    if(this.curPlat && !this.jumping){
      this.yPos = this.curPlat.yPos - this.height;
    }
  }

  getCurrentPlatform(){
    this.environment.platforms.forEach((platform) => {
      if(this.xPos > platform.xStart && this.xPos < platform.xStart + width){
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