import Platform from "./platform";

export default class Environment{
  constructor(dimensions, context){
    this.dimensions = {
      height: dimensions.height,
      width: dimensions.width
    };
    // this.context = context;

    this.height = 300;

    this.platforms = [];
  }

  animate(context){
    this.draw(context);
  }

  draw(context){
    context.fillStyle = 'black';
    context.fillRect(0, 300, 800, 15);
  }

}