

export default class Platform{
  constructor(xStart, yStart, width, height){
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
  }

  draw(context) {
    context.fillStyle = 'black';
    context.fillRect(this.xStart, this.yStart, this.width, this.height);
  }

  move(x, y){
    this.xStart += x;
    this.yStart += y;
  }

}