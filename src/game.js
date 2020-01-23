import Environment from "./environment";
import Human from './human';
import Background from "./background";
import Computer from "./computer";
import Score from "./score";
import LandComputer from "./land_computer";
import DynamicComputer from './dynamic_computer';
import * as CollisionUtil from './util/collision_logic';


export default class Game{
  constructor(canvas){
    this.context = canvas.getContext('2d');
    this.dimensions = {
      height: canvas.height,
      width: canvas.width
    };
    this.round = 0;
    this.roundVals = [0, 5, 10, 15, 20];

    this.computerCount = 0;
    this.landComputerCount = 0;

    this.computers = {};
    this.landComputers = {};
    this.dynamicComputers = {};
    this.computersBeingAdded = 0;
    this.numComputers = this.computers.length + this.computersBeingAdded;

    this.humanProjectiles = {};
    this.computerProjectiles = {};
    this.landComputerProjectiles = {};
    this.dynamicComputerProjectiles = {};

    this.projectileOffset = 100;

    this.startMenu = document.getElementById('start-menu');
    this.playButton = document.getElementById('play-button');
    this.gameAndTitle = document.getElementById('game-and-title');
  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  filterProjectiles(){
    this.grabHumanProjectiles();
    this.grabComputerProjectiles();
    this.checkCollisions();
    this.deleteProjectiles(this.humanProjectiles);
    this.deleteProjectiles(this.computerProjectiles);
    this.deleteProjectiles(this.landComputerProjectiles);
    this.deleteProjectiles(this.dynamicComputerProjectiles);
    this.sendDownProjectiles();
  }

  sendDownProjectiles(){
    this.human.projectiles = this.humanProjectiles;

    for(let i = 0; i < Object.values(this.computerProjectiles).length; i++){
      let p = Object.values(this.computerProjectiles)[i];
      let compId = p.player.id;
      if(this.computers[compId]){
        this.computers[compId].projectiles[p.id] = p;
      }
    }
    for(let i = 0; i < Object.values(this.landComputerProjectiles).length; i++){
      let p = Object.values(this.landComputerProjectiles)[i];
      let compId = p.player.id;
      if(this.landComputers[compId]){
        this.landComputers[compId].projectiles[p.id] = p;
      }
    }
    for(let i = 0; i < Object.values(this.dynamicComputerProjectiles).length; i++){
      let p = Object.values(this.dynamicComputerProjectiles)[i];
      let compId = p.player.id;
      if(this.dynamicComputers[compId]){
        this.dynamicComputers[compId].projectiles[p.id] = p;
      }
    }
  }

  deleteProjectiles(projectiles){
    Object.values(projectiles).forEach((p) => {
      if(p.didHit){
        delete projectiles[p.id];
      }else if(!p.alive){
        delete projectiles[p.id];
      }else if(this.offScreen(p) && !p.homing){
        delete projectiles[p.id];
      }
    })
  }

  offScreen(projectile){
    if(projectile.xPos > 1150 || projectile.xPos < -50){
      return true;
    }else if(projectile.yPos > 800 || projectile.yPos < -50){
      return true;
    }
    return false;
  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  grabHumanProjectiles(){
    this.humanProjectiles = this.human.projectiles;
  }

  grabComputerProjectiles(){
    let res = this.computerProjectiles;
    Object.values(this.computers).forEach((computer) => {
      res = Object.assign(res, computer.projectiles);
      computer.projectiles = {};
    })
    this.computerProjectiles = res;

    let dynRes = this.dynamicComputerProjectiles;
    Object.values(this.dynamicComputers).forEach((computer) => {
      dynRes = Object.assign(dynRes, computer.projectiles);
      computer.projectiles = {};
    })
    this.dynamicComputerProjectiles = dynRes;

    let landRes = this.landComputerProjectiles;
    Object.values(this.landComputers).forEach((lc) => {
      landRes = Object.assign(landRes, lc.projectiles);
      lc.projectiles = {};
    })
    this.landComputerProjectiles = landRes;
  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  checkCollisions(){
    CollisionUtil.objectCollision(this.human, Object.values(this.computerProjectiles));
    CollisionUtil.objectCollision(this.human, Object.values(this.landComputerProjectiles));
    let homingProjectiles = Object.values(this.computerProjectiles).filter(p => p.homing === true);


    // this.didPlayerHit(homingProjectiles);
    this.didPlayerHit(this.computers);
    this.didPlayerHit(this.landComputers);
    this.didPlayerHit(this.dynamicComputers);
    for(let i = 0; i < homingProjectiles.length; i++){
      let hp = homingProjectiles[i]
      CollisionUtil.objectCollision(hp, Object.values(this.humanProjectiles));
    }
    // for(let i = 0; i < Object.values(this.computers).length; i++){
    //   let computer = Object.values(this.computers)[i];
    //   this.score.score += CollisionUtil.objectCollision(computer, Object.values(this.humanProjectiles));
    // }
    // for(let i = 0; i < Object.values(this.landComputers).length; i++){
    //   let lc = Object.values(this.landComputers)[i];
    //   this.score.score += CollisionUtil.objectCollision(lc, Object.values(this.humanProjectiles))
    // }
  }

  didPlayerHit(objects){
    let objectsArr = Object.values(objects);
    for(let i = 0; i < objectsArr.length; i++){
      let el = objectsArr[i];
      this.score.score += CollisionUtil.objectCollision(el, Object.values(this.humanProjectiles));
    }
  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  filterComputers(){
    for(let i = 0; i < Object.keys(this.computers).length; i++){
      let key = Object.keys(this.computers)[i];
      if(this.computers[key].yPos > 700){
        delete this.computers[key];
      }
    }
    for(let i = 0; i < Object.keys(this.landComputers).length; i++){
      let key = Object.keys(this.landComputers)[i];
      if(this.landComputers[key].yPos > 700){
        delete this.landComputers[key];
      }
    }

  }

  switchRounds(){
    let score = this.score.score;
    if (score >= 15){
      this.round = 3;
    } else if (score >= 10){
      this.round = 2;
    }else if (score >= 5){
      this.round = 1;
    }else{
      this.round = 0;
    }
    this.background.round = this.round;
  }

  
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------



  setNumComputers(){
    this.numComputers = Object.values(this.computers).length + this.computersBeingAdded;
  }

  spawnComputer(){
    this.computersBeingAdded += 1;
    let newCompStartX;
    let randNum = Math.random();
    if(randNum <= 0.5){
      newCompStartX = 1150;
    }else{
      newCompStartX = -50;
    }
    window.setTimeout(() => {
      let newComp = new Computer(this.environment, this.context, this.human, this.computerCount, newCompStartX);
      this.computers[this.computerCount] = newComp;
      this.computerCount += 1;
      this.computersBeingAdded -= 1;
    }, 5000);
  }

  spawnDynamicComputer(){

  }

  configureProjectile(pos, homing=false, projectile=null){
    let randNum = Math.random();
    
    let xDelta;
    let yDelta;

    // if projectile is homing, we need to call this method and compare the projectile's
    // current position with that of the human player, else we are comparing the player and the computer
    if(homing === false){
      xDelta = pos.x - this.xPos;
      yDelta = pos.y - this.yPos;
    }else if(homing === true){
      xDelta = pos.x - projectile.xPos;
      yDelta = pos.y - projectile.yPos;
    }

    if(homing === false){
      let randOffset = Math.round(Math.random() * 200);
      if(randNum < 0.25){
        xDelta += randOffset;
      }else if(randNum > 0.25 && randNum < 0.5){
        xDelta -= randOffset;
      }
    }

    let squaredDeltaX = Math.pow(xDelta, 2);
    let squaredDeltaY = Math.pow(yDelta, 2);
    let totalDeltasquared = squaredDeltaX + squaredDeltaY;
    let totalDelta = Math.sqrt(totalDeltasquared);

    let proportion;
    if(projectile === null){
      proportion = 5 / totalDelta;
    }else{
      proportion = 3 / totalDelta;
    }
    let xVel = xDelta * proportion;
    let yVel = yDelta * proportion;

    return [xVel, yVel];
  }

  createInitialComputers(){
    let i = 1;
    let compStartX;
    while(i < 1){
      if(i % 2 === 0){
        compStartX = 1150 + (100 * i);
      }else{
        compStartX = -50 - (100 * i);
      }
      let newComp = new Computer(this.environment, this.context, this.human, this.computerCount, compStartX);
      this.computers[this.computerCount] = newComp;
      this.computerCount += 1;
      i += 1;
    }
    let j = 0;
    while(j < 2){
      let newLandComp = new LandComputer(this.environment, this.context, this.human, this.computerCount);
      this.landComputers[newLandComp.id] = newLandComp;
      this.computerCount += 1;
      j += 1;
    }
    let k = 0;
    while(k < 3){
      if(k % 2 === 0){
        compStartX = 1150 + (100 * k);
      }else{
        compStartX = -50 - (100 * k);
      }
      let newDynamicComp = new DynamicComputer(this.environment, this.context, this.human, this.computerCount, compStartX);
      this.dynamicComputers[newDynamicComp.id] = newDynamicComp;
      this.computerCount += 1;
      k += 1;
    }
  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  restart(){
    this.background = new Background(this.dimensions);
    this.environment = new Environment(this.dimensions, this.context);
    this.human = new Human(this.environment, this.context, this.computerProjectiles);
    this.environment.human = this.human;
    this.score = new Score(this.context);
    this.createInitialComputers();
    this.gameAndTitle.removeChild(this.startMenu);
    this.step();
  }

  step(){
    this.animate();
    this.filterProjectiles();
    this.filterComputers();
    this.switchRounds();
    this.setNumComputers();

    if(this.numComputers < 1){
      this.spawnComputer();
    }
    if(!this.gameOver()){
      window.requestAnimationFrame(this.step.bind(this));
    }else{
      this.gameAndTitle.appendChild(this.startMenu);
    }
  }

  animate(){
    this.background.animate(this.context);
    this.environment.animate(this.context);
    this.human.animate(this.context);
    this.score.animate();
    this.animateProjectiles();
    Object.values(this.computers).forEach((c) => {
      c.animate(this.context, this.human);
    });
    Object.values(this.landComputers).forEach((comp) => {
      comp.animate(this.context);
    })
    Object.values(this.dynamicComputers).forEach((dc) => {
      dc.animate(this.context, this.human);
    });

  }

  animateProjectiles(){
    Object.values(this.humanProjectiles).forEach((p) => {
      p.animate(this.context);
    })
    Object.values(this.computerProjectiles).forEach((p) => {
      if(p.homing){
        let pos = {x : this.human.xPos, y: this.human.yPos};
        p.animate(this.context, ...this.configureProjectile(pos, true, p));
      }else{
        p.animate(this.context);
      }
    })
    Object.values(this.landComputerProjectiles).forEach((p) => {
      p.animate(this.context);
    })
    for(let i = 0; i < Object.values(this.dynamicComputerProjectiles).length; i++){
      let p = Object.values(this.dynamicComputerProjectiles)[i];
      p.animate(this.context);
    }
  }



  gameOver(){
    if(this.human.yPos > 710){
      return true;
    }else if(!this.human.alive && this.human.yPos > 710){
      return true;
    }else{
      return false;
    }
  }


}



