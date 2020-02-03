import Platform from "./platform";
import Shield from "./powerups/shield/shield";
import * as Search from './util/search';
import TripleShot from "./powerups/tripleshot/tripleshot";

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
    this.platforms = {};
    this.generatePlatforms();
    this.gapOffset = 0;
    this.human = human;

    this.shrinkTick = 30;
    this.shrinking = false;

    this.head;
    this.tail;
  }
  // change from checking last platform in array to know if we need to generate more,
  // switch to checking the one with the highest id, which is the max of the keys of platform
  generatePlatforms(){
    let firstPlat = new Platform(-2360, 550, 600, 15, this.platformCount);

    this.head = firstPlat;
    this.tail = firstPlat;

    this.platformCount += 1;
    this.platforms[firstPlat.id] = firstPlat;

    let lastPlat = firstPlat;

      while(lastPlat.xStart + lastPlat.width < 3000){
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

        newPlat.prev = this.tail;
        this.tail.next = newPlat;
        this.tail = newPlat;

        this.platformCount += 1;
        this.platforms[newPlat.id] = newPlat;
        this.generatePowerup(newPlat);
        lastPlat = Search.furthestRightPlatform(this.platforms);
      }
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
    this.addPlatform();
  }

  addPlatform(){
    if(!this.gapOffset) this.gapOffset = 0;
    // let firstPlat = Search.furthestLeftPlatform(this.platforms);
    // let prevPlat = Search.furthestRightPlatform(this.platforms);
    if(this.head.xStart < -2450){

      let newHead = this.head.next;
      this.head.next.prev = null;
      delete this.platforms[this.head.id]; //delete head
      this.head = newHead;

      let newPlat = new Platform(
        this.tail.xStart + this.tail.width + this.generatePlatformGap(),
        this.generatePlatformYStart(),
        this.generatePlatformWidth(),
        15,
        this.platformCount
      );

      this.tail.next = newPlat;
      newPlat.prev = this.tail;
      this.tail = newPlat;

      this.platformCount += 1;
      this.platforms[newPlat.id] = newPlat;
      this.generatePowerup(newPlat);

    }else if(this.tail.xStart > 2500){

      let newTail = this.tail.prev;
      this.tail.prev.next = null;
      delete this.platforms[this.tail.id];
      this.tail = newTail;

      let newPlatWidth = this.generatePlatformWidth();
      // let nextPlat = firstPlat;
      let newPlat = new Platform(
          this.head.xStart - this.generatePlatformGap() - newPlatWidth,
          this.generatePlatformYStart(),
          newPlatWidth,
          15,
          this.platformCount
      );
      
      this.head.prev = newPlat;
      newPlat.next = this.head;
      this.head = newPlat;

      this.platformCount += 1;
      this.platforms[newPlat.id] = newPlat;
      this.generatePowerup(newPlat);
    }
  }

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------


  generatePowerup(newPlat){
    let randNum = Math.random();
    if(randNum <= 0.25){
      let newShield = new Shield(
        newPlat.xStart + (Math.random() * newPlat.width),
        newPlat.yStart - 10,
        this.powerupsCount,
        newPlat
      )
      this.powerupsCount += 1;
      newPlat.powerups[newShield.id] = newShield;
    }else if(randNum > 0.25 && randNum <= .5){
      let newTripleShot = new TripleShot(
        newPlat.xStart + (Math.random() * newPlat.width),
        newPlat.yStart - 10,
        this.powerupsCount,
        newPlat
      )
      this.powerupsCount += 1;
      newPlat.powerups[newTripleShot.id] = newTripleShot;
    }
  }

  generatePlatformYStart(){
    if(Object.keys(this.platforms).length === 0){
      return 550;
    }else{
      let lastPlat = this.platforms[Math.max(...Object.keys(this.platforms))];
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
    let width;
    if(randNum < .5){
      width = (400 + randomOffset);
    }else{
      width = (400 - randomOffset);
    }
    if(this.gapOffset) width -= this.gapOffset;
    return width;
  }

  generatePlatformGap(){
    let gap = Math.round(Math.random() * 100) + 100;
    if(this.gapOffset){
      return gap + this.gapOffset;
    }else{
      return gap;
    }

  }

  shrink(){
    let plats = Object.values(this.platforms);
    this.shrinkTick = 0;
    let theShrink = window.setInterval(() => {
      for(let i = 0; i < plats.length; i++){
        let p = plats[i];
        p.shrink(2);
        this.shrinkTick += 1;
        if(this.shrinkTick >= 20){
          this.shrinkTick = 0;
          window.clearInterval(theShrink);
        }
      }
    }, 50)
  }

}