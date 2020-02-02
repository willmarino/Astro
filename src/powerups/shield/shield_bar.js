export default class ShieldBar{
  constructor(xPos, yPos, percent){
    this.xPos = xPos;
    this.yPos = yPos;

    this.width = 100;
  }

  animate(context){
    this.draw(context);
  }

  draw(context){
    context.fillStyle = 'black';
    context.fillRect(this.xPos, this.yPos, this.width, 10);
  }


}