export default class HealthBar{
  constructor(max, xPos, yPos, width, height, direction){
    this.max = max;
    this.xPos = xPos;
    this.yPos = yPos;
    this.maxWidth = width;
    this.width = width;
    this.height = height;
    this.health = max;
    this.status = 'high';
    this.color = { 'high' : 'green', 'mid' : 'yellow', 'low' : 'red' };
    this.direction = direction;
  }

  // animate(context, xPos, yPos){
  //   this.setStatus();
  //   this.draw(context);
  //   this.move(xPos, yPos);
  // }

  draw(context){
    this.setStatus();
    let fraction = this.health / this.max;
    this.width = Math.round(fraction * this.maxWidth);

    context.fillStyle = this.color[this.status];
    if(this.direction = true){
      context.fillRect(
        this.xPos, this.yPos, this.width, this.height
      )
    }else{
      context.fillRect(
        this.xPos - this.width, this.yPos, this.width, this.height
      )
    }
  }

  move(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
  }

  setStatus(){
    let status = this.health / this.max;
    if(status >= 0.75){
      this.status = 'high';
    }else if(status < 0.75 && status > 0.4){
      this.status = 'mid';
    }else{
      this.status = 'low';
    }
  }



}