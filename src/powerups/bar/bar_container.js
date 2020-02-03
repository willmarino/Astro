
import Bar from './bar';

export default class BarContainer{
  constructor(xPos, yPos, length){
    this.date = new Date();
    this.curTime = (this.date.getMinutes() * 60000) + (this.date.getSeconds() * 1000) + (this.date.getMilliseconds());
    this.endTime = this.curTime + length;

    this.xPos = xPos;
    this.yPos = yPos;

    this.length = length;

    this.bar = new Bar(this.xPos, this.yPos);

  }

  animate(context){
    this.setPercentage();
    this.draw(context);
    this.bar.animate(context);
  }

  draw(context){
    context.strokeRect(this.xPos, this.yPos, 100, 10);
  }

  setPercentage(){
    this.date = new Date();
    this.curTime = (this.date.getMinutes() * 60000) + (this.date.getSeconds() * 1000) + (this.date.getMilliseconds());
    let progress = this.endTime - this.curTime;
    let percentage = 1 - ((this.length - progress) / this.length);
    this.bar.width = Math.round(100 * percentage);
  }

}