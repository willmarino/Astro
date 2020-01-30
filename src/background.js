

export default class Background{
  constructor(dimensions, round=0){
    this.dimensions = dimensions;
    this.round = round;

    this.colors = [
      'white',
      '#5eaec4',
      'orange'
    ];
  }

  // setRound(num){
  //   this.round = num;
  // }

  draw(context){
    context.fillStyle = this.colors[this.round];
    context.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  animate(context){
    this.draw(context);
  }
}