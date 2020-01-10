import Environment from "./environment";
import Human from './human';
import Background from "./background";
import Computer from "./computer";


export default class Game{
  constructor(canvas){
    this.context = canvas.getContext('2d');
    this.dimensions = {
      height: canvas.height,
      width: canvas.width
    };
    this.running = false;

    this.computers = [];
    this.numComputers = this.computers.length + this.computersBeingAdded;
    this.computersBeingAdded = 0;

    this.humanProjectiles = [];
    this.computerProjectiles = [];

  }

  filterComputers(){
    this.computers = this.computers.filter(c => c.yPos < 415);
  }

  run(){
    this.context.canvas.addEventListener('mousedown', () => {
      console.log('akjsda');
      this.click();
    });
  }

  click(){
    if(!this.running){
      this.play();
    }
  }

  spawnComputer(){
    this.computersBeingAdded += 1;
    let newCompStartX;
    let randNum = Math.random();
    if(randNum <= .5){
      newCompStartX = 1150
    }else{
      newCompStartX = -50
    }
    window.setTimeout(() => {
      this.computers.push(
        new Computer(this.environment, this.context, this.human, newCompStartX)
      )
      this.computersBeingAdded -= 1;
    }, 5000);
  }

  animate(){
    this.background.animate(this.context);
    this.environment.animate(this.context);
    this.human.animate(this.context);
    this.computers.forEach((c) => {
      c.animate(this.context);
    });
    if(this.numComputers < 6){
      debugger;
      this.spawnComputer();
    }
    // this.computer.()
    if(this.running){
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }

  play(){
    this.running = true;
    this.filterComputers();
    this.animate();
  }

  restart(){
    this.background = new Background(this.dimensions);
    this.environment = new Environment(this.dimensions, this.context);
    this.human = new Human(this.environment, this.context, this.computerProjectiles);
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
    this.animate();
    this.run();
  }

}