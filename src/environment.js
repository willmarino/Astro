 import Platform from "./platform";

export default class Environment{
  constructor(dimensions, context, human=null){
    this.dimensions = {
      height: dimensions.height,
      width: dimensions.width
    };
    this.context = context;

    this.height = 300;

    this.platforms = [];
    this.generatePlatforms();

    this.human = human;
  }

  generatePlatforms(){
    this.platforms.push(
      new Platform(-1360, 550, 600, 15)
    );
    while(
      this.platforms[this.platforms.length - 1].xStart +
      this.platforms[this.platforms.length - 1].width < 2000){
        let prevPlat = this.platforms[this.platforms.length - 1];
        let newYStart = this.generatePlatformYStart();
        if(newYStart - prevPlat.yStart > 50){
          newYStart = prevPlat.yStart + 50;
        }
        this.platforms.push(
          new Platform(
            prevPlat.xStart + prevPlat.width + this.generatePlatformGap(),
            newYStart,
            this.generatePlatformWidth(),
            15
          ));
      }
  }

  generatePlatformYStart(){
    if(this.platforms.length === 0){
      return 550;
    }else{
      let prevPlatHeight = this.platforms[this.platforms.length - 1].yStart;
      let randomOffset = Math.round(Math.random() * 150);
      if(randomOffset < 30){
        randomOffset = 50;
      }
      let randHeight;
      if(Math.random() < 0.5){
        randHeight = prevPlatHeight + randomOffset;
      }else{
        randHeight = prevPlatHeight - randomOffset;
      }
      if(randHeight < 350){
        randHeight = 350;
      }else if(randHeight > 625){
        randHeight = 625;
      }
      return randHeight;
    }
  }

  generatePlatformWidth(){
    let randomOffset = Math.round(Math.random() * 200);
    // let randomNegOffset = Math.round(Math.random() * (200 * (-1)));
    let randNum = Math.random();
    if(randNum < .5){
      return 400 + randomOffset;
    }else{
      return 400 - randomOffset;
    }
  }

  generatePlatformGap(){
    return Math.round(Math.random() * 100) + 100;
  }

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------

  animate(context){
    this.draw(context);
    this.action();
  }

  action(){
    this.move();
  }

  move(){
    let that = this;
    if(this.human.xPos >= 800 && this.human.xVel > 0){
      this.platforms.forEach((plat) => {
        // plat.move(that.human.xVel * (-1) - .1, 0);
        plat.move(that.human.xVel * (-1), 0);
      });
    }else if(this.human.xPos <= 300 && this.human.xVel < 0){
      this.platforms.forEach((plat) => {
        // plat.move(this.human.xVel * (-1) + .1, 0);
        plat.move(this.human.xVel * (-1), 0);
      });
    }
    if(this.platforms[0].xStart < -1450){
      this.platforms.shift();
      let prevPlat = this.platforms[this.platforms.length - 1];
      this.platforms.push(
        new Platform(
          prevPlat.xStart + prevPlat.width + this.generatePlatformGap(),
          this.generatePlatformYStart(),
          this.generatePlatformWidth(),
          15
        ));
    }else if(this.platforms[this.platforms.length - 1].xStart > 1300){
      this.platforms.pop();
      let newPlatWidth = this.generatePlatformWidth();
      let nextPlat = this.platforms[0];
      this.platforms.unshift(
        new Platform(
          nextPlat.xStart - this.generatePlatformGap() - newPlatWidth,
          this.generatePlatformYStart(),
          newPlatWidth,
          15
        ));
    }
  }

  draw(context){
    this.platforms.forEach((p) => {
      p.draw(context);
    });
    
    

  }

}