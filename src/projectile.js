

export default class Projectile{
  constructor(player, projectileXVel, projectileYVel, homing=false, human=null){
    this.player = player;
    this.homing = homing;

    this.human = human;
    this.owner = player.type;
    this.context = player.context;

    this.didHit = false;

    this.playerXVel = player.xVel;
    this.playerXPos = player.xPos;
    this.playerYPos = player.yPos;

    this.xPos = player.xPos + (player.width / 2);
    this.yPos = player.yPos + (player.width / 2);
    this.xVel = projectileXVel;
    this.yVel = projectileYVel;
    if(player.type === 'human'){
      this.width = 5;
      this.height = 5;
    }else{
      if(homing){
        this.width = 15;
        this.height = 15;  
      }else{
        this.width = 5;
        this.height = 5;
      }
    }
    this.alive = true;
    this.id = player.projectileCount;
  }
  
  animate(context, xVel=null, yVel=null){
    if(this.owner === 'computer'){
      if(this.homing === true){
        this.homingMove(xVel, yVel);
        this.homingDraw(context);
      }else{
        this.computerProjectileMove();
        this.draw(context);
      }
    }else{
      this.humanProjectileMove();
      this.draw(context);
    }
  }
  
  humanProjectileMove(){
    if((this.playerXPos >= 800 && this.playerXVel >= 0)){
      this.xPos += this.xVel;
      if(this.owner === 'computer'){
        this.xPos -= (this.playerXVel / 2);
      }
      this.yPos += this.yVel;
    } else if ((this.playerXPos <= 300 && this.playerXVel <= 0)){
      this.xPos += this.xVel;
      if(this.owner === 'computer'){
        this.xPos -= (this.playerXVel / 2);
      }
      this.yPos += this.yVel;
    }else{
      this.xPos += this.xVel;
      this.yPos += this.yVel;
    }
  }

  computerProjectileMove(){
    if((this.human.xPos >= 800 && this.human.xVel >= 0)){
      this.xPos += this.xVel;
      if(this.owner === 'computer'){
        this.xPos -= (this.human.xVel / 2);
      }
      this.yPos += this.yVel;
    } else if ((this.human.xPos <= 300 && this.human.xVel <= 0)){
      this.xPos += this.xVel;
      if(this.owner === 'computer'){
        this.xPos -= (this.human.xVel / 2);
      }
      this.yPos += this.yVel;
    }else{
      this.xPos += this.xVel;
      this.yPos += this.yVel;
    }
  }

  homingMove(xVel, yVel){

    if((this.human.xPos >= 800 && this.human.xVel >= 0)){
      this.xPos += xVel;
      if(this.owner === 'computer'){
        this.xPos -= (this.human.xVel / 2);
      }
      this.yPos += yVel;
    } else if ((this.human.xPos <= 300 && this.human.xVel <= 0)){
      this.xPos += xVel;
      if(this.owner === 'computer'){
        this.xPos -= (this.human.xVel / 2);
      }
      this.yPos += yVel;
    }else{
      this.xPos += xVel;
      this.yPos += yVel;
    }
  }

// ---------------------
  draw(context){
    if(!this.didHit){
      if(this.owner === 'human'){
        context.fillStyle = 'black';
        context.fillRect(this.xPos, this.yPos, this.width, this.height);  
      }else{
        context.fillStyle = 'black';
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
      }
    }
  }

  homingDraw(context) {
    if (!this.didHit) {
      context.fillStyle = 'green';
      context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
  }

}