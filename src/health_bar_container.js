import HealthBar from "./healthbar";

export default class HealthBarContainer{
  constructor(max, xPos, yPos, width, height, direction){
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.health = max;
    this.direction = direction;
    this.healthBar = new HealthBar(max, xPos, yPos, width, height, direction);
  }

  animate(context, xPos, yPos){
    
    this.healthBar.health = this.health;
    this.healthBar.direction = this.direction;

    this.move(xPos, yPos);
    this.draw(context);
  }

  move(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.healthBar.move(xPos, yPos);
  }

  draw(context){
    context.strokeStyle = 'black';
    context.strokeRect(this.xPos, this.yPos, this.width, 10);
    this.healthBar.draw(context);
  }
}