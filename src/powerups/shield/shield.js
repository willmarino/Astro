export default class Shield{
  constructor(xPos, yPos, id, platform){
    this.didHit = false;
    this.type = 'shield';
    this.xPos = xPos;
    this.yPos = yPos - 10;
    this.health = 3;
    this.id = id;
    this.platform = platform;
    this.width = 10;
    this.height = 10;
    this.present = true;
  }

  animate(context, x, y){
    this.draw(context);
    this.move(x, y);
  }

  move(x, y){
    this.xPos += x;
    this.yPos += y;
  }

  draw(context){
    context.beginPath();
    context.arc(this.xPos, this.yPos, 8, 0, 2 * Math.PI);
    context.fillStyle = 'green'
    context.fill();
    context.stroke();
    context.closePath();
    // context.fillStyle = 'green';

  }
}