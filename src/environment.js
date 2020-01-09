import Platform from "./platform";

export default class Environment{
  constructor(dimensions, context, human=null){
    this.dimensions = {
      height: dimensions.height,
      width: dimensions.width
    };
    this.context = context;

    this.height = 300;

    this.platforms = [
      new Platform(-360, 300),
      new Platform(-50, 300),
      new Platform(260, 300),
      new Platform(570, 300),
      new Platform(880, 300),
      new Platform(1190, 300),
      new Platform(1500, 300),
      new Platform(1810, 300),
      new Platform(2120, 300)
    ];

    this.human = human;
  }



  animate(context){
    this.draw(context);
    this.action();
  }

  action(){
    this.move();
  }

  move(){
    let that = this;
    if(this.human.xPos >= 900 && this.human.xVel > 0){
      this.platforms.forEach((plat) => {
        // debugger;
        plat.move(that.human.xVel * (-1) - .1, 0);
      });
    }else if(this.human.xPos <= 200 && this.human.xVel < 0){
      this.platforms.forEach((plat) => {
        plat.move(this.human.xVel * (-1) + .1, 0);
      });
    }
    if(this.platforms[0].xStart < -450){
      this.platforms.shift();
      this.platforms.push(
        new Platform(this.platforms[this.platforms.length - 1].xStart + 310, 300)
      );
    }else if(this.platforms[this.platforms.length - 1].xStart > 1300){
      this.platforms.pop();
      this.platforms.unshift(
        new Platform(this.platforms[0].xStart - 310, 300)
      );
    }
  }

  draw(context){
    this.platforms.forEach((p) => {
      p.draw(context);
    });
    
    

  }

}