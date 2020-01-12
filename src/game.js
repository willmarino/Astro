import Environment from "./environment";
import Human from './human';
import Background from "./background";
import Computer from "./computer";
import Score from "./score";


export default class Game{
  constructor(canvas){
    this.context = canvas.getContext('2d');
    this.dimensions = {
      height: canvas.height,
      width: canvas.width
    };
    this.running = false;

    this.computers = [];
    this.computersBeingAdded = 0;
    this.numComputers = this.computers.length + this.computersBeingAdded;

    this.humanProjectiles = [];
    this.computerProjectiles = [];

    this.allProjectiles = {};

  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  filterComputers(){
    this.computers = this.computers.filter(c => c.yPos < 10000);
  }

  run(){
    this.context.canvas.addEventListener('mousedown', () => {
      this.click();
    });
  }

  click(){
    if(!this.running){
      this.play();
    }
  }

  switchRounds(){
    if(this.human.distanceCovered > 100){
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
        new Computer(this.environment, this.context, this.human, newCompStartX)
      );
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

  sendEnemyProjectiles(){
    this.computers.forEach((comp) => {
      Object.values(comp.projectiles).forEach((projectile) => {
        this.human.computerProjectiles[projectile.id] = projectile;
      });
    });
  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  addEnemyScore(){
    let that = this;
    this.computers.forEach((comp) => {
      that.score.score += comp.additionalScore;
      comp.additionalScore = 0;
    });
  }

  addProjectiles(){
    this.allProjectiles = this.human.projectiles;
    for(let i = 0; i < this.computers.length; i++){
      let curComp = this.computers[i];
      debugger;
      this.allProjectiles = Object.assign(this.allProjectiles, curComp.projectiles);
    }
  }

  step(){
    // debugger;
    // this.addProjectiles();

    this.animate();
    
    this.addEnemyScore();
    this.filterComputers();
    if(this.running){
      window.requestAnimationFrame(this.step.bind(this));
    }
  }


  animate(){

    // this.filterComputers();
    this.sendEnemyProjectiles();

    this.background.animate(this.context);
    this.environment.animate(this.context);
    this.human.animate(this.context);
    this.score.animate();

    this.setPlayerTracking();

    this.computers.forEach((c) => {
      c.animate(this.context);
    });

    this.setNumComputers();

    if(this.numComputers < 6){
      this.spawnComputer();
    }

  }

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------

  play(){
    this.running = true;
    this.step();
  }

  restart(){
    this.background = new Background(this.dimensions);
    this.environment = new Environment(this.dimensions, this.context);
    this.human = new Human(this.environment, this.context, this.computerProjectiles);
    this.score = new Score(this.context);
    this.environment.human = this.human;
    let i = 1;
    let compStartX;
    while(i < 6){
      if(i % 2 === 0){
        compStartX = 1150 + (100 * i);
      }else{
        compStartX = -50 - (100 * i);
      }
      this.computers.push(new Computer(this.environment, this.context, this.human, compStartX));
      i += 1;
    }
    this.running = false;
    this.step();
    this.run();
  }

}