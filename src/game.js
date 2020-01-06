import Environment from "./environment";
import Player from "./player";


export default class Game{
  constructor(canvas){
    this.context = canvas.getContext('2d');
    this.dimensions = {
      height: canvas.height,
      width: canvas.width
    };
  }

  play(){

  }

  draw(){
    this.context.fillStyle = '#5eaec4';
    this.context.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.environment.draw(this.context);
    this.player.draw(this.context);
  }

  restart(){
    this.environment = new Environment(this.dimensions, this.context);
    this.player = new Player();
    this.running = false;
  }

}