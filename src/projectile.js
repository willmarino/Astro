

export default class Projectile{
  constructor(playerPos, context, xVel, yVel){
    this.context = context;

    this.xPos = playerPos.xPos;
    this.yPos = playerPos.yPos;
    this.yVel = yVel;
    this.xVel = xVel;

  }
  
  animate(context){
    this.move();
    this.draw(context);
  }
  
  move(){
    this.xPos += this.xVel;
    this.yPos += this.yVel;
  }


  draw(context){
    context.fillStyle = 'white';
    context.fillRect(this.xPos, this.yPos, 5, 5);
  }

}