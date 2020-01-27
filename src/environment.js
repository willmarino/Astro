import Platform from "./platform";
import Shield from "./powerups/shield";
import * as Search from './util/search';

export default class Environment{
  constructor(dimensions, context, human=null){
    this.dimensions = {
      height: dimensions.height,
      width: dimensions.width
    };
    this.context = context;

    this.height = 300;

    this.powerupsCount = 0;
    this.platformCount = 0;
    this.powerups = {};
    // this.platforms = [];
    this.platforms = {};
    this.generatePlatforms();

    this.human = human;
  }
  // change from checking last platform in array to know if we need to generate more,
  // switch to checking the one with the highest id, which is the max of the keys of platform
  generatePlatforms(){
    let firstPlat = new Platform(-1360, 550, 600, 15, this.platformCount);
    this.platformCount += 1;
    this.platforms[firstPlat.id] = firstPlat;
    // this.platforms.push(
    //   new Platform(-1360, 550, 600, 15)
    // );

    // let maxId = Math.max(...Object.keys(this.platforms));
    // let lastPlat = this.platforms[maxId];

    // let lastPlat = Search.furthestRightPlatform(this.platforms);

    let lastPlat = firstPlat;

    // while(this.platforms[this.platforms.length - 1].xStart + this.platforms[this.platforms.length - 1].width < 2000){
      while(lastPlat.xStart + lastPlat.width < 2000){
        // let prevPlat = this.platforms[this.platforms.length - 1];
        let newYStart = this.generatePlatformYStart();
        if(newYStart - lastPlat.yStart > 50){
          newYStart = lastPlat.yStart + 50;
        }
        let newPlat = new Platform(
          lastPlat.xStart + lastPlat.width + this.generatePlatformGap(),
          newYStart,
          this.generatePlatformWidth(),
          15,
          this.platformCount
        );
        // this.platforms.push(newPlat);
        this.platformCount += 1;
        this.platforms[newPlat.id] = newPlat;
        this.generatePowerup(newPlat);


        // maxId = Math.max(...Object.keys(this.platforms));
        // lastPlat = this.platforms[maxId];
        lastPlat = Search.furthestRightPlatform(this.platforms);


        // let randNum = Math.random();
        // if(randNum <= 1){
        //   let newShield = new Shield(
        //     newPlat.xStart + (Math.random() * newPlat.width),
        //     newPlat.yStart - 10,
        //     this.powerupsCount,
        //     newPlat
        //   )
        //   this.powerupsCount += 1;
        //   newPlat.powerups[newShield.id] = newShield;
        // }
      }
  }

  generatePowerup(newPlat){
    let randNum = Math.random();
    if(randNum <= 1){
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

  generatePlatformYStart(){
    if(Object.keys(this.platforms).length === 0){
      return 550;
    }else{
      let lastPlat = this.platforms[Math.max(...Object.keys(this.platforms))];
      // let prevPlatHeight = this.platforms[this.platforms.length - 1].yStart;
      let prevPlatHeight = lastPlat.yStart;
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

  animate(context){
    this.draw(context);
    this.action();
  }

  action(){
    this.move();
  }

  draw(context){
    Object.values(this.platforms).forEach((p) => {
      p.draw(context);
    });
  }

  move(){
    let that = this;
    if(this.human.xPos >= 800 && this.human.xVel > 0){
      Object.values(this.platforms).forEach((plat) => {
        plat.move(that.human.xVel * (-1), 0);
      });
    }else if(this.human.xPos <= 300 && this.human.xVel < 0){
      Object.values(this.platforms).forEach((plat) => {
        plat.move(this.human.xVel * (-1), 0);
      });
    }
    // --------------------
    // let firstPlat = this.platforms[Math.min(...Object.keys(this.platforms))];
    let firstPlat = Search.furthestLeftPlatform(this.platforms);
    // let prevPlat = this.platforms[Math.max(...Object.keys(this.platforms))];
    let prevPlat = Search.furthestRightPlatform(this.platforms);
    // if(this.platforms[0].xStart < -1450){
    if(firstPlat.xStart < -1450){
      // this.platforms.shift();
      delete this.platforms[firstPlat.id];

      // let prevPlat = this.platforms[this.platforms.length - 1];

      let newPlat = new Platform(
        prevPlat.xStart + prevPlat.width + this.generatePlatformGap(),
        this.generatePlatformYStart(),
        this.generatePlatformWidth(),
        15,
        this.platformCount
      );
      // this.platforms.push(newPlat);
      this.platformCount += 1;
      this.platforms[newPlat.id] = newPlat;
      this.generatePowerup(newPlat);
    // }else if(this.platforms[this.platforms.length - 1].xStart > 1300){
    }else if(prevPlat.xStart > 1300){
      // this.platforms.pop();
      delete this.platforms[prevPlat.id];
      let newPlatWidth = this.generatePlatformWidth();
      // let nextPlat = this.platforms[0];
      let nextPlat = firstPlat;
      let newPlat = new Platform(
          nextPlat.xStart - this.generatePlatformGap() - newPlatWidth,
          this.generatePlatformYStart(),
          newPlatWidth,
          15,
          this.platformCount
      );
      // this.platforms.unshift(newPlat);
      this.platformCount += 1;
      this.platforms[newPlat.id] = newPlat;
      this.generatePowerup(newPlat);
    }
    // --------------------------
  }

}