export const collide = (obj1, obj2) => {

  // let obj1TopLeft = {x : obj1.xPos, y: obj1.yPos};
  // let obj1TopRight = { x: obj1.xPos + obj1.width, y: obj1.yPos };
  // let obj1BotLeft = { x: obj1.xPos, y: obj1.yPos + obj1.height };
  // let obj1BotRight = { x : obj1.xPos + obj1.width, y : obj1.yPos + obj1.height};

  let obj1Diag = Math.sqrt(Math.pow(obj1.width / 2, 2) + Math.pow(obj1.height / 2, 2)) / 2;

  // let obj2TopLeft = {x : obj2.xPos, y : obj2.yPos};
  // let obj2TopRight = { x: obj2.xPos + obj2.width, y: obj2.yPos };
  // let obj2BotLeft = { x: obj2.xPos, y: obj2.yPos + obj2.height };
  // let obj2BotRight = {x : obj2.xPos + obj2.width, y : obj2.yPos + obj2.height};

  let obj2Diag = Math.sqrt(Math.pow(obj2.width / 2, 2) + Math.pow(obj2.height / 2, 2)) / 2;

  
  let obj1XCenter = obj1.xPos + Math.round(obj1.width / 2);
  let obj1YCenter = obj1.yPos + Math.round(obj1.height / 2);
  let obj2XCenter = obj2.xPos + Math.round(obj2.width / 2);
  let obj2YCenter = obj2.yPos + Math.round(obj2.height / 2);

  // let totalDelta = Math.sqrt(Math.pow(obj1.xPos - obj2.xPos, 2) + Math.pow(obj1.yPos - obj2.yPos, 2));
  let totalDelta = Math.sqrt(Math.pow((obj1XCenter - obj2XCenter), 2) + Math.pow((obj1YCenter - obj2YCenter), 2));
  
  // if((obj1TopLeft.x < obj2BotRight.x && obj1TopLeft.y < obj2BotRight.y) &&
  //   (obj1Diag + obj2Diag > totalDelta)){
  //   return true;
  // } else if (obj1TopRight.x > obj2BotLeft.x && obj1TopRight.y > obj2BotLeft.y && (obj1Diag + obj2Diag > totalDelta)){
  //   return true;
  // } else if (obj1BotRight.x > obj2TopLeft.x && obj1BotRight.y > obj2TopLeft.y && (obj1Diag + obj2Diag > totalDelta)){
  //   return true;
  // } else if (obj1BotLeft.x < obj2TopRight.x && obj1BotLeft.y > obj2TopRight.y && (obj1Diag + obj2Diag > totalDelta)){
  //   return true;
  // }else{
  //   return false;
  // }
  
  
  if(obj1Diag + obj2Diag + 10 > totalDelta){
    return true;
  }else{
    return false;
  }

}

const circleCollide = (obj, projectile) => {
  // test if dist btw obj and projectile is less than the raidus of the obj
  let pCenterX = projectile.yPos - Math.round( projectile.height / 2);
  let pCenterY = projectile.xPos + Math.round( projectile.width / 2 );
  let xDiff = Math.abs(obj.xPos - pCenterX);
  let yDiff = Math.abs(obj.yPos - pCenterY);
  let totalDiff = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if(totalDiff > obj.radius){
    return false;
  }else{
    return true;
  }
}

export const objectCollision = (obj, projectiles) => {
  let count = 0;
  for(let i = 0; i < projectiles.length; i++){
    let p = projectiles[i];
    if(collide(obj, p)){
      if(isComputer(obj) && p.owner === 'human'){
        if(obj.alive) count += 2;
      }
      p.didHit = true;
      if(!obj.shielded && !obj.invincible) obj.health -= 1;
      if(obj.health === 0) obj.alive = false;
    }
  }

  return count;
}

const isComputer = (obj) => {
  if(obj.type === 'computer' || obj.type === 'land-computer'){
    return true;
  }
  return false;
}

export const powerupCollision = (obj, powerups) => {
  for(let i = 0; i < powerups.length; i++){
    let p = powerups[i];
    if(collide(obj, p)){
      p.present = false;
      return p;
    }
  }
  return null;
}

export const shieldCollision = (obj, projectiles) => {
  for(let i = 0; i < projectiles.length; i++){
    let p = projectiles[i];
    if(circleCollide(obj, p)){
      reconfigure(obj, p);
    }
  }
}

// unfinished
const reconfigure = (obj, p) => {
  // 1
  // let pCoords = {x : p.xPos, y : p.yPos};
  // let objCoords = {x : obj.xPos, y: obj.yPos};
  // let v1 = {start : objCoords, end : pCoords};
  // // 2
  // let v1xDiff = v1.start.x - v1.end.x;
  // let v1yDiff = v1.start.y - v1.end.y;
  // // 3
  // let perpxDiff = v1yDiff;
  // let perpyDiff = v1xDiff;
  // // 4
  // let perpSlope = perpyDiff / perpxDiff;
  p.xVel = 0;
  p.yVel = -10;


}