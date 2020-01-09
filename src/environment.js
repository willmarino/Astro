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
      new Platform(-360, 300, 300, 10)
    );
    while(
      this.platforms[this.platforms.length - 1].xStart +
      this.platforms[this.platforms.length - 1].width < 2000){
        let prevPlat = this.platforms[this.platforms.length - 1];
        this.platforms.push(
          new Platform(
            prevPlat.xStart + prevPlat.width + this.generatePlatformGap(),
            this.generatePlatformYStart(),
            this.generatePlatformWidth(),
            10
          ));
      }
  }

  generatePlatformYStart(){
    if(this.platforms.length === 0){
      return 300;
    }else{
      let prevPlatHeight = this.platforms[this.platforms.length - 1].yStart;
      let randomPosOffset = Math.round(Math.random() * 50);
      let randomNegOffset = Math.round(Math.random() * (50 * (-1)));
      return prevPlatHeight + randomPosOffset + randomNegOffset;
    }
  }

  generatePlatformWidth(){
    let randomPosOffset = Math.round(Math.random() * 200);
    let randomNegOffset = Math.round(Math.random() * (200 * (-1)));
    return 300 + randomNegOffset + randomPosOffset;
  }

  generatePlatformGap(){
    return Math.round(Math.random() * 30) + 15;
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
    if(this.human.xPos >= 900 && this.human.xVel > 0){
      this.platforms.forEach((plat) => {
        plat.move(that.human.xVel * (-1) - .1, 0);
      });
    }else if(this.human.xPos <= 200 && this.human.xVel < 0){
      this.platforms.forEach((plat) => {
        plat.move(this.human.xVel * (-1) + .1, 0);
      });
    }
    if(this.platforms[0].xStart < -450){
      this.platforms.shift();
      let prevPlat = this.platforms[this.platforms.length - 1];
      this.platforms.push(
        new Platform(
          prevPlat.xStart + prevPlat.width + this.generatePlatformGap(),
          this.generatePlatformYStart(),
          this.generatePlatformWidth(),
          10
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
          10
        ));
    }
  }

  draw(context){
    this.platforms.forEach((p) => {
      p.draw(context);
    });
    
    

  }

}