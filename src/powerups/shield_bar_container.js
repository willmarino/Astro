
import ShieldBar from './shield_bar';

export default class ShieldBarContainer{
  constructor(){
    this.date = new Date();
    this.curTime = (this.date.getMinutes() * 60000) + (this.date.getSeconds() * 1000) + (this.date.getMilliseconds());
    this.endTime = this.curTime + 5000;

    this.xPos = 10;
    this.yPos = 50;

    // this.curTime = 1;
    this.shieldBar = new ShieldBar(this.xPos, this.yPos, 1);

  }

  animate(context){
    this.setPercentage();
    this.draw(context);
    this.shieldBar.animate(context);
  }

  draw(context){
    context.strokeRect(this.xPos, this.yPos, 100, 10);
  }

  setPercentage(){
    this.date = new Date();
    this.curTime = (this.date.getMinutes() * 60000) + (this.date.getSeconds() * 1000) + (this.date.getMilliseconds());
    let progress = this.endTime - this.curTime;
    let percentage = 1 - ((5000 - progress) / 5000);
    this.shieldBar.width = Math.round(100 * percentage);
  }

}