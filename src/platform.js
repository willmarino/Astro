

export default class Platform{
  constructor(xStart, yStart){
    // this.dimensions = dimensions;

    this.height = 20;
    this.width = 200;
    this.xStart = xStart;
    this.yStart = yStart;
  }

  draw(context) {
    context.fillStyle = 'black';
    context.fillRect(this.xStart, this.yStart, this.width, this.height);
  }
}