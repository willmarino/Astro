

export default class ShieldAttachment{
  constructor(human){
    this.type = 'shield';
    this.human = human;
    this.xPos = this.human.xPos;
    this.yPos = this.human.yPos;
    this.radius = 20;
  }
  animate(context){
    this.move();
    this.draw(context);
  }

  move(){
    this.xPos = this.human.xPos;
    this.yPos = this.human.yPos;
  }

  draw(context){
    context.beginPath();
    context.arc(this.xPos + (this.human.width / 2), this.yPos + (this.human.height / 2), this.radius, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    // context.fill();
    context.stroke();
    context.closePath();
  }
}