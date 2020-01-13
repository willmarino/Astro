

export default class Projectile{
  // constructor(id, playerXVel, playerPos, context, xVel, yVel){
  constructor(player, projectileXVel, projectileYVel, homing=false){

    this.homing = homing;

    this.owner = player.type;
    this.context = player.context;

    this.didHit = false;

    this.playerXVel = player.xVel;
    this.playerXPos = player.xPos;
    this.playerYPos = player.yPos;

    this.xPos = player.xPos;
    this.yPos = player.yPos;
    this.xVel = projectileXVel;
    this.yVel = projectileYVel;
    if(player.type === 'human'){
      this.width = 5;
      this.height = 5;
    }else{
      if(homing){
        this.width = 20;
        this.height = 20;  
      }else{
        this.width = 5;
        this.height = 5;
      }
    }

    this.id = player.projectileCount;
  }
  
  animate(context, xVel=null, yVel=null){
    if(this.homing === true){
      this.homingMove(xVel, yVel);
      this.homingDraw(context);
    }else{
      this.move();
      this.draw(context);
    }
  }
  
  move(){
    if((this.playerXPos >= 800 && this.playerXVel >= 0)){
      this.xPos += this.xVel;
      this.xPos -= this.playerXVel;
      // this.xPos -= (this.playerXVel / 2);
      this.yPos += this.yVel;
    } else if ((this.playerXPos <= 300 && this.playerXVel <= 0)){
      this.xPos += this.xVel;
      this.xPos -= (this.playerXVel / 2);
      this.yPos += this.yVel;
    }else{
      this.xPos += this.xVel;
      this.yPos += this.yVel;
    }
    // this.xPos += this.xVel;
    // this.yPos += this.yVel;
  }

  homingMove(xVel, yVel){
    this.xPos += xVel;
    this.yPos += yVel;
  }


  draw(context){
    if(!this.didHit){
      if(this.owner === 'human'){
        context.fillStyle = 'black';
        context.fillRect(this.xPos, this.yPos, this.width, this.height);  
      }else{
        context.fillStyle = 'white';
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
      }
    }
  }

  homingDraw(context) {
    if (!this.didHit) {
      context.fillStyle = 'green';
      context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
  }

}