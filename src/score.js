

export default class Score{
  constructor(context, initScore=0){
    this.xPos = 1050;
    this.yPos = 100;
    this.score = initScore;

    this.context = context;
  }

  animate(){
    this.draw();
  }

  draw(){
    this.context.fillStyle = 'black';
    this.context.font = "20px Arial";
    this.context.fillText(this.score, this.xPos, this.yPos);
  }
}