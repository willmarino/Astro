import Platform from "./platform";

export default class Environment{
  constructor(dimensions, context){
    this.dimensions = {
      height: dimensions.height,
      width: dimensions.width
    };
    this.context = context;
    this.platforms = [];
  }

  draw(){
    for(let i = 0; i < 3; i++){
      let newPlat = new Platform(this.dimensions);
      this.platforms.push(newPlat);
      newPlat.draw(this.context);
    }
  }

}