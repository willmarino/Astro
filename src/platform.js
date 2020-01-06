

export default class Platform{
  constructor(dimensions){
    this.dimensions = dimensions;
    this.position = {

    };
  }

  draw(context) {
    let height = 20;
    let width = Math.round(Math.random() * 50) + 100;
    let vertStart = Math.round(Math.random() * 200) + 100;
    let horStart = Math.round(Math.random() * 800);

    this.position = {
      x1: horStart,
      y1: vertStart,
      x2: width,
      y2: height
    };



    context.fillStyle = 'black';
    context.fillRect(horStart, vertStart, width, height);
  }
}