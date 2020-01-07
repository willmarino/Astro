

export default class Background{
  constructor(dimensions, round=0){
    this.dimensions = dimensions;
    this.round = round;
  }

  draw(context){
    context.fillStyle = '#5eaec4';
    context.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  animate(context){
    this.draw(context);
  }
}