

export default class Background{
  constructor(dimensions, round=0){
    this.dimensions = dimensions;
    this.round = round;

    this.colors = [
      '#5eaec4',
      'orange',
      'green',
      'blue'
    ];
  }

  setRound(num){
    this.round = num;
  }

  draw(context){
    context.fillStyle = this.colors[this.round];
    context.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  animate(context){
    this.draw(context);
  }
}