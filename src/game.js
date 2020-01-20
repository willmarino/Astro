import Environment from "./environment";
import Human from './human';
import Background from "./background";
import Computer from "./computer";
import Score from "./score";
import LandComputer from "./land_computer";
import * as CollisionUtil from './util/collision_logic';


export default class Game{
  constructor(canvas){
    this.context = canvas.getContext('2d');
    this.dimensions = {
      height: canvas.height,
      width: canvas.width
    };
    this.running = false;

    this.computerCount = 0;
    this.computers = [];
    this.landComputers = [];
    this.computersBeingAdded = 0;
    this.numComputers = this.computers.length + this.computersBeingAdded;

    this.humanProjectiles = {};
    this.computerProjectiles = {};

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
  }

  sendDownProjectiles(){
    this.human.projectiles = this.humanProjectiles;
    this.computers.forEach((computer) => {
      let projectiles = {};
      this.computerProjectiles.forEach((p) => {
        if(p.player.id === computer.id){
          projectiles = Object.assign(p, projectiles);
        }
      })
      computer.projectiles = projectiles;
    })
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
    this.computers.forEach((computer) => {
      res = Object.assign(res, computer.projectiles);
    })
    this.computerProjectiles = res;
  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  checkCollisions(){
    CollisionUtil.objectCollision(this.human, Object.values(this.computerProjectiles));

    let homingProjectiles = Object.values(this.computerProjectiles).filter(p => p.homing === true);
    homingProjectiles.forEach((hp) => {
      CollisionUtil.objectCollision(hp, Object.values(this.humanProjectiles));
    })

    this.computers.forEach((computer) => {
      this.score.score += CollisionUtil.objectCollision(computer, Object.values(this.humanProjectiles));
    })
  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  // if computer players are offscreen, that means theyre no longer alive, and dont need to be
  // in the game's computers list, and they dont need to be rendered
  filterComputers(){
    this.computers = this.computers.filter(c => c.yPos < 700);
  }

  switchRounds(){
    if(this.score.score > 5){
      this.background.round = 1;
    }
  }

  
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------



  setNumComputers(){
    this.numComputers = this.computers.length + this.computersBeingAdded;
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
      this.computers.push(
        new Computer(this.environment, this.context, this.human, this.computerCount, newCompStartX)
      );
      this.computerCount += 1;
      this.computersBeingAdded -= 1;
    }, 5000);
  }

  setPlayerTracking(){
    this.computers.forEach((comp) => {
      Object.values(comp.projectiles).forEach((proj) => {
        proj.playerXVel = this.human.xVel;
        proj.playerXPos = this.human.xPos;
        proj.playerYPos = this.human.yPos;
      });
    });
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
    this.computers = [];
    let i = 1;
    let compStartX;
    while(i < 3){
      if(i % 2 === 0){
        compStartX = 1150 + (100 * i);
      }else{
        compStartX = -50 - (100 * i);
      }
      this.computers.push(new Computer(this.environment, this.context, this.human, this.computerCount, compStartX));
      this.computerCount += 1;
      i += 1;
    }
    // let j = 0;
    // while(j < 10){
    //   this.landComputers.push(new LandComputer(this.environment, this.context, this.human, j * 5));
    //   j += 1;
    // }
    this.landComp = new LandComputer(this.environment, this.context, this.human);
    this.running = false;
    this.gameAndTitle.removeChild(this.startMenu);
    this.step();
  }

  step(){
    this.animate();
    this.filterProjectiles();
    this.switchRounds();
    this.filterComputers();
    this.setNumComputers();

    if(this.numComputers < 3){
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

    this.setPlayerTracking();

    this.computers.forEach((c) => {
      c.animate(this.context, this.human);
    });
    this.landComp.animate(this.context);
    // this.landComputers.forEach((comp) => {
    //   comp.animate(this.context);
    // })

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



