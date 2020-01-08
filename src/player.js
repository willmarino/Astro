import Projectile from "./projectile";

// q1 -- q2
// |      |
// q3 -- q4
// only need q1 and q4 (or q3 and q2) for collision
// width, height

export default class Player{
  constructor(environment, context){
    this.context = context;
    this.environment = environment;

    this.CONSTANTS = {
      GRAVITY: 0.5
    };

    this.projectiles = [];

    // this.xPos = 100;
    // this.yPos = 100;
    // this.yVel = 0;
    // this.xVel = 0;
    // this.width = 10;
    // this.height = 10;

    // this.bindMovement();
    // this.bindJump();
    // this.setClick = this.setClick.bind(this);
    // this.setClick(this);
  }

  setClick(that) {
    this.context.canvas.addEventListener('click', (e) => {
      // debugger;
      
      let rect = this.context.canvas.getBoundingClientRect();
      let pos = {};
      pos.x = e.clientX - rect.left;
      pos.y = e.clientY - rect.top;


      that.projectiles.push(new Projectile(
        { xPos: that.xPos, yPos: that.yPos}, 
        that.context,
        ...that.configureProjectile(pos)
        )
      );


    });
  }

  configureProjectile(pos){
    let xDelta = pos.x - this.xPos;
    let yDelta = pos.y - this.yPos;

    let squaredDeltaX = Math.pow(xDelta, 2);
    let squaredDeltaY = Math.pow(yDelta, 2);
    let totalDeltasquared = squaredDeltaX + squaredDeltaY;
    let totalDelta = Math.sqrt(totalDeltasquared);

    let proportion = 20 / totalDelta;
    let xVel = xDelta * proportion;
    let yVel = yDelta * proportion;

    return [xVel, yVel];
  }

  jump(){
    this.yVel -= 5;
  }

  moveRight(){
    this.xVel += 2;
    if(this.xVel > 5){
      this.xVel = 5;
    }
  }

  moveLeft() {
    this.xVel -= 2;
    if (this.xVel < -5) {
      this.xVel = -5;
    }
  }

  bindMovement(){
    window.addEventListener('keypress', (e) => {
      if(e.key === 'd'){
        this.moveRight();
      }else if (e.key === 'a') {
        this.moveLeft();
      }
    });
  }

  bindJump(){
    window.addEventListener('keypress', (e) => {
      if (e.key === 'w') {
        this.jump();
      }
    });
  }

  draw(context){
    context.fillStyle = 'gray';
    context.fillRect(
      this.xPos, this.yPos, this.width, this.height
    );
  }

  move(){
    this.yPos += this.yVel;
    this.xPos += this.xVel;
    if(this.collided() !== true){
      this.yVel += this.CONSTANTS.GRAVITY;
    }
    if(this.xVel > 0){
      this.xVel -= 0.1;
    }else if(this.xVel < 0){
      this.xVel += 0.1;
    }
  }

  animate(context){
    this.move();
    this.draw(context);
    if(this.projectiles.length > 0){
      this.projectiles.forEach((p) => {
        p.animate(context);
      });
    }
    this.projectiles = this.projectiles.filter(p => p.xPos < 810 && p.xPos > -10 && p.yPos > -10 && p.yPos < 410);
  }

  collided(){
    if(this.yPos >= this.environment.height - 13){
      this.yVel = 0;
      return true;
    }
  }


}