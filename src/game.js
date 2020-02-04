import Environment from "./environment";
import Human from './human';
import Background from "./background";
import Computer from "./computer";
import Score from "./score";
import LandComputer from "./land_computer";
import DynamicComputer from './dynamic_computer';
import * as CollisionUtil from './util/collision_logic';
import * as PIXI from '../pixi';


export default class Game{
  constructor(canvas){
    this.context = canvas.getContext('2d');
    this.dimensions = {
      height: canvas.height,
      width: canvas.width
    };

    this.paused = false;

    this.round = 0;
    this.roundVals = [0, 5, 10, 15, 20];

    this.computerCount = 0;
    this.landComputerCount = 0;

    this.computers = {};
    this.landComputers = {};
    this.dynamicComputers = {};
    
    this.computersBeingAdded = 0;
    this.numComputers = Object.values(this.computers).length + this.computersBeingAdded;
    this.dynamicComputersBeingAdded = 0;
    this.numdynamicComputers = Object.values(this.dynamicComputers).length + this.dynamicComputersBeingAdded;
    this.landComputersBeingAdded = 0;
    this.numLandComputers = Object.values(this.landComputers).length + this.landComputersBeingAdded;

    this.canSpawnComp = true;
    this.canSpawnDynComp = true;
    this.canSpawnLandComp = true;

    this.spawnRates = {0 : {c : 1, lc : 1, dc : 1}, 1 : {c : 2, lc : 2, dc : 2}, 2 : {c : 3, lc : 3, dc : 3}};

    this.humanProjectiles = {};
    this.computerProjectiles = {};
    this.landComputerProjectiles = {};
    this.dynamicComputerProjectiles = {};
    this.allPowerups = {} // actually only the powerups from the player's current platform

    this.projectileOffset = 100;

    this.startMenu = document.getElementById('start-menu');
    this.playButton = document.getElementById('play-button');
    this.gameAndTitle = document.getElementById('game-and-title');
    this.pauseButton = document.getElementById('pause-button');
    this.instructions = document.getElementById('instructions');
    this.instructionsBackdrop = document.getElementById('instructions-backdrop')

    this.addPauseListener();

  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  switchPause(){
    this.paused = !this.paused;
    let comps = Object.values(this.computers).concat(Object.values(this.landComputers));
    for(let i = 0; i < comps.length; i++){
      let c = comps[i];
      c.gamePaused = this.paused;
      if(this.paused) window.clearInterval(c.shootingInterval);
      if(!this.paused) c.initiateShot();
    }
  }

  addPauseListener(){
    debugger;
    let that = this;
    // let comps = Object.values(this.computers).concat(Object.values(this.landComputers));
    this.pauseListener = this.pauseButton.addEventListener('click', () => {
      that.switchPause();
      if(!that.paused){
        that.step();
        debugger;
        if(that.instructions.parentNode === that.gameAndTitle){
          that.gameAndTitle.removeChild(that.instructions);
        }
      }else{
        that.gameAndTitle.appendChild(that.instructions);
      }
    })
  }

  filterProjectiles(){
    this.grabAll();

    this.checkCollisions();

    this.deleteAllProjectiles();
    // this.deletePowerups();

    this.sendDownProjectiles();
    // this.sendDownPowerups(this.allPowerups, this.environment.platforms);
  }

  deleteAllProjectiles(){
    this.deleteProjectiles(this.humanProjectiles);
    this.deleteProjectiles(this.computerProjectiles);
    this.deleteProjectiles(this.landComputerProjectiles);
    this.deleteProjectiles(this.dynamicComputerProjectiles);
  }

  sendDownProjectiles(){
    this.human.projectiles = this.humanProjectiles;
    this.sendDown(this.computerProjectiles, this.computers);
    this.sendDown(this.landComputerProjectiles, this.landComputers);
    this.sendDown(this.dynamicComputerProjectiles, this.dynamicComputers);
  }

  sendDownPowerups(powerups, platforms){
    let powerupsArr = Object.values(powerups);
    for(let i = 0; i < powerupsArr.length; i++){
      let p = powerupsArr[i];
      let platId = p.platform.id;
      if(platforms[platId]){
        platforms[platId].powerups[p.id] = p;
      }
    }
  }

  sendDown(projectiles, comps){
    let projectilesArr = Object.values(projectiles);
    for(let i = 0; i < projectilesArr.length; i++){
      let p = projectilesArr[i];
      let compId = p.player.id;
      if(comps[compId]){
        comps[compId].projectiles[p.id] = p;
      }
    }
  }

  deletePowerups(){
    let powersArr = Object.values(this.allPowerups);
    for(let i = 0; i < powersArr.length; i++){
      let p = powersArr[i];
      if(!p.present){
        delete this.allPowerups[p.id];
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

  grabAll(){
    this.grabHumanProjectiles();
    this.grabComputerProjectiles();
    this.grabPowerups();
  }

  grabHumanProjectiles(){
    this.humanProjectiles = this.human.projectiles;
  }

  grabComputerProjectiles(){
    this.grabFrom(this.computerProjectiles, this.computers);
    this.grabFrom(this.landComputerProjectiles, this.landComputers);
    this.grabFrom(this.dynamicComputerProjectiles, this.dynamicComputers);
  }

  grabFrom(projectiles, comps){
    let compsArr = Object.values(comps);
    for(let i = 0; i < compsArr.length; i++){
      let c = compsArr[i];
      projectiles = Object.assign(projectiles, c.projectiles);
      c.projectiles = {};
    }

  }

  grabPowerups(){
    if(this.human.curPlat){
      let powerups = Object.values(this.human.curPlat.powerups);
      for(let i = 0; i < powerups.length; i++){
        let p = powerups[i];
        this.allPowerups[p.id] = p;
      }
    }
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
    CollisionUtil.objectCollision(this.human, Object.values(this.dynamicComputerProjectiles));

    // this.human.powerups = Object.assign(CollisionUtil.powerupCollision(this.human, Object.values(this.allPowerups)), this.human.powerups);
    let newPowerup = CollisionUtil.powerupCollision(this.human, Object.values(this.allPowerups));
    if(newPowerup){
      this.human.powerups[newPowerup.id] = newPowerup;
      delete this.environment.platforms[newPowerup.platform.id].powerups[newPowerup.id];
      delete this.allPowerups[newPowerup.id];
    }

    this.didPlayerHit(this.computers);
    this.didPlayerHit(this.landComputers);
    this.didPlayerHit(this.dynamicComputers);
    this.didPlayerHit(this.dynamicComputers);
    let homingProjectiles = Object.values(this.computerProjectiles).filter(p => p.homing === true);
    for(let i = 0; i < homingProjectiles.length; i++){
      let hp = homingProjectiles[i]
      CollisionUtil.objectCollision(hp, Object.values(this.humanProjectiles));
    }
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
    this.filterHelper(this.computers);
    this.filterHelper(this.landComputers);
    this.filterHelper(this.dynamicComputers);

  }

  filterHelper(objects){
    let arr = Object.keys(objects);
    for(let i = 0; i < arr.length; i++){
      let el = arr[i];
      if(objects[el].yPos > 700){
        delete objects[el];
      }
    }
  }

  

  switchRounds(){
    let score = this.score.score;
    if (score >= 30){
      this.round = 2;
      this.environment.gapOffset = 130;
    }else if (score >= 15){
      this.round = 1;
      this.environment.gapOffset = 65;
    }else{
      this.round = 0;
      this.environment.gapOffset = 0;
    }
    if(this.round !== this.background.round){
      this.environment.shrink();
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

  setNumDynamicComputers(){
    this.numdynamicComputers = Object.values(this.dynamicComputers).length + this.dynamicComputersBeingAdded;
  }

  setNumLandComputers(){
    this.numLandComputers = Object.values(this.landComputers).length + this.landComputersBeingAdded;
  }

  spawnLandComputer(){
    this.canSpawnLandComp = false;
    this.landComputersBeingAdded += 1;
    window.setTimeout(() => {
      let newLandComp = new LandComputer(this.environment, this.context, this.human, this.landComputerCount);
      this.landComputers[newLandComp.id] = newLandComp;
      this.landComputerCount += 1;
      this.landComputersBeingAdded -= 1;
      this.canSpawnLandComp = true;
      // console.log('spawned!');
      // console.log(newLandComp.xPos);
    }, 2500);
  }

  spawnComputer(){
    this.canSpawnComp = false;
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
      this.canSpawnComp = true;
    }, 2500);
  }

  spawnDynamicComputer(){
    this.canSpawnDynComp = false;
    this.dynamicComputersBeingAdded += 1;
    let newCompStartX;
    let randNum = Math.random();
    if(randNum <= 0.5){
      newCompStartX = 1150;
    }else{
      newCompStartX = -50;
    }
    window.setTimeout(() => {
      let newDynamicComp = new DynamicComputer(this.environment, this.context, this.human, this.computerCount, newCompStartX);
      this.dynamicComputers[this.computerCount] = newDynamicComp;
      this.computerCount += 1;
      this.dynamicComputersBeingAdded -= 1;
      this.canSpawnDynComp = true;
    }, 2500);
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
      proportion = 5 / totalDelta;
    }
    let xVel = xDelta * proportion;
    let yVel = yDelta * proportion;

    return [xVel, yVel];
  }

  createInitialComputers(offset=1){
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
    while(j < 1){
      let newLandComp = new LandComputer(this.environment, this.context, this.human, this.landComputerCount, this.paused);
      this.landComputers[newLandComp.id] = newLandComp;
      this.landComputerCount += 1;
      j += 1;
    }
    let k = 0;
    while(k < 1){
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
    // debugger;
    this.animate();
    this.filterProjectiles();
    this.filterComputers();
    this.switchRounds();
    this.setNumComputers();
    this.setNumDynamicComputers();
    this.setNumLandComputers();

    if(this.numComputers < this.spawnRates[this.round]['c']){
      if(this.canSpawnComp) this.spawnComputer();
    }
    if(this.numdynamicComputers < this.spawnRates[this.round]['dc']){
      if(this.canSpawnDynComp) this.spawnDynamicComputer();
    }
    if(this.numLandComputers < this.spawnRates[this.round]['lc']){
      if(this.canSpawnLandComp) this.spawnLandComputer();
    }
    if(!this.gameOver() && !document.hidden && !this.paused){
      window.requestAnimationFrame(this.step.bind(this));
    }else if(this.gameOver()){
      debugger;
      this.context = null;
      window.clearInterval(this.pauseListener);
      this.gameAndTitle.appendChild(this.startMenu);
      this.startMenu.appendChild(this.instructions);
    }
  }

  animate(){
    this.background.animate(this.context);
    this.environment.animate(this.context);
    this.human.animate(this.context);
    this.score.animate();
    this.animateProjectiles();
    let that = this;
    Object.values(this.computers).forEach((c) => {
      c.animate(this.context, this.human);
    });

    for(let i = 0; i < Object.values(this.landComputers).length; i++){
      let comp = Object.values(this.landComputers)[i];
      if(!comp.type){
      }
      comp.animate(this.context);

    }

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



