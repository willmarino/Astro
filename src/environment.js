import Platform from "./platform";

export default class Environment{
  constructor(dimensions, context){
    this.dimensions = {
      height: dimensions.height,
      width: dimensions.width
    };
    this.context = context;

    this.height = 300;

    this.platforms = [
      new Platform(-50, 300),
      new Platform(160, 300),
      new Platform(370, 300),
      new Platform(580, 300),
    ];
  }



  animate(context){
    this.draw(context);
  }

  action(){
    this.move();

  }

  move(){

  }

  draw(context){
    // context.fillStyle = 'black';
    // context.fillRect(0, 300, 800, 15);
    this.platforms.forEach((p) => {
      p.draw(context);
    });
    
    

  }

}