import Environment from "./environment";
import Player from "./player";
import Background from "./background";


export default class Game{
  constructor(canvas){
    this.context = canvas.getContext('2d');
    this.dimensions = {
      height: canvas.height,
      width: canvas.width
    };
    this.running = false;
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
    this.player.animate(this.context);
    if(this.running){
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }

  play(){
    this.running = true;
    this.animate();
  }

  // draw(){
  //   this.environment.draw(this.context);
  //   this.player.draw(this.context);
  // }

  restart(){
    this.background = new Background(this.dimensions);
    this.environment = new Environment(this.dimensions, this.context);
    this.player = new Player(this.environment, this.context);
    this.running = false;
    this.animate();
    this.run();
  }

}