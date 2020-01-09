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

  animate(){
    this.background.animate(this.context);
    this.environment.animate(this.context);
    this.human.animate(this.context);
    this.computers.forEach((c) => {
      c.animate(this.context);
    });
    // this.collectProjectiles();
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
    let i = 0;
    let compStartX = 850;
    while(i < 5){
      this.computers.push(new Computer(this.environment, this.context, this.human, compStartX));
      compStartX += 30;
      i += 1;
    }
    this.running = false;
    this.animate();
    this.run();
  }

}