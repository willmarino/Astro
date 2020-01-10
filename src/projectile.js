

export default class Projectile{
  // constructor(id, playerXVel, playerPos, context, xVel, yVel){
  constructor(player, projectileXVel, projectileYVel){

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

    this.width = 5;
    this.height = 5;

    this.id = player.projectileCount;
  }
  
  animate(context){
    this.move();
    this.draw(context);
  }
  
  move(){
    // if((this.playerXPos >= 800 && this.playerXVel >= 0)){
    //   this.xPos += this.xVel;
    //   this.xPos -= this.playerXVel;
    //   this.yPos += this.yVel;
    // } else if ((this.playerXPos <= 300 && this.playerXVel <= 0)){
    //   this.xPos += this.xVel;
    //   this.xPos -= this.playerXVel;
    //   this.yPos += this.yVel;
    // }else{
    //   this.xPos += this.xVel;
    //   this.yPos += this.yVel;
    // }
    this.xPos += this.xVel;
    this.yPos += this.yVel;
  }


  draw(context){
    if(!this.didHit){
      context.fillStyle = 'white';
      context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
  }

}