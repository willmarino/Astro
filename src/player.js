// q1 -- q2
// |      |
// q3 -- q4
// only need q1 and q4 (or q3 and q2) for collision
// width, height

export default class Player{
  constructor(){

    this.CONSTANTS = {
      GRAVITY: 10
    };

    this.xPos = 100;
    this.yPos = 100;
    this.yVel = 0;
    this.xVel = 0;
    this.width = 10;
    this.height = 10;
  }

  draw(context){
    context.fillStyle = 'gray';
    context.fillRect(
      this.xPos, this.yPos, this.width, this.height
    );
  }

  move(){
    this.yPos += this.yVel;
    this.xPos += this.xVel;
    this.yVel += this.CONSTANTS.GRAVITY;
  }

  animate(context){
    this.move();
    this.draw(context);
  }

}