import Platform from "./platform";
import Shield from "./powerups/shield";

export default class Environment{
  constructor(dimensions, context, human=null){
    this.dimensions = {
      height: dimensions.height,
      width: dimensions.width
    };
    this.context = context;

    this.height = 300;

    this.powerupsCount = 0;
    this.powerups = {};
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
        // this.platforms.push(
        //   new Platform(
        //     prevPlat.xStart + prevPlat.width + this.generatePlatformGap(),
        //     newYStart,
        //     this.generatePlatformWidth(),
        //     15
        //   )
        // );
        let newPlat = new Platform(
          prevPlat.xStart + prevPlat.width + this.generatePlatformGap(),
          newYStart,
          this.generatePlatformWidth(),
          15
        );
        this.platforms.push(newPlat);
        let randNum = Math.random();
        if(randNum <= 1){
          // let plat = this.platforms[this.platforms.length - 1];
          debugger;
          let newShield = new Shield(
            newPlat.xStart + (Math.random() * newPlat.width),
            newPlat.yStart - 10,
            this.powerupsCount,
            newPlat
          )
          this.powerupsCount += 1;
          newPlat.powerups[newShield.id] = newShield;
        }

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
      if(randHeight < 450){
        randHeight = 450;
      }else if(randHeight > 625){
        randHeight = 625;
      }
      return randHeight;
    }
  }

  generatePlatformWidth(){
    let randomOffset = Math.round(Math.random() * 200);
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

  removePowerups(){
    for(let i = 0; i < Object.values(this.powerups).length; i++){
      let p = Object.values(this.powerups)[i];
      if(!this.platforms.includes(p.plat)){
        delete this.powerups[p];
      }
    }
  }

  animate(context){
    this.draw(context);
    this.action();
    for(let i = 0; i < Object.values(this.powerups).length; i++){
      let p = Object.values(this.powerups)[i];
      p.animate(context);
      // for(let j = 0; j < Object.values(p.powerups).length; j++){
      //   let powerup = Object.values(p.powerups)[j];
      //   powerup.animate(context);
      // }
    }
  }

  action(){
    this.move();
    this.removePowerups();
  }

  move(){
    let that = this;
    if(this.human.xPos >= 800 && this.human.xVel > 0){
      this.platforms.forEach((plat) => {
        plat.move(that.human.xVel * (-1), 0);
      });
    }else if(this.human.xPos <= 300 && this.human.xVel < 0){
      this.platforms.forEach((plat) => {
        plat.move(this.human.xVel * (-1), 0);
      });
    }
    // --------------------
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
    // --------------------------
  }

  addPlatforms(){
    
  }

  draw(context){
    this.platforms.forEach((p) => {
      p.draw(context);
    });
    
    

  }

}