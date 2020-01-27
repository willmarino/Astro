

export default class Platform{
  constructor(xStart, yStart, width, height, id){
    this.xStart = xStart;
    this.yStart = yStart;
    this.width = width;
    this.height = height;
    this.powerups = {};
    this.shrinking = false;
    this.id = id;
    
  }

  draw(context) {
    context.fillStyle = 'black';
    context.fillRect(this.xStart, this.yStart, this.width, this.height);

    for(let i = 0; i < Object.values(this.powerups).length; i++){
      let curPowerup = Object.values(this.powerups)[i];
      curPowerup.draw(context);
    }
  }

  move(x, y){
    this.xStart += x;
    this.yStart += y;
    for(let i = 0; i < Object.values(this.powerups).length; i++){
      let curPowerup = Object.values(this.powerups)[i];
      curPowerup.move(x, y);
    }
  }

  shrink(x){
    this.width -= x;
  }

}