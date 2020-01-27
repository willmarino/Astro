
// takes in object of platforms, returns that platform which is 'last', which is furthest right
// this is O(n)
export const furthestRightPlatform = (platforms) => {
  let platformsArr = Object.values(platforms);

  // let furthest = {id: null, xStart: null};
  let furthest = null
  for(let i = 0; i < platformsArr.length; i++){
    let cur = platformsArr[i];
    if(!furthest || cur.xStart > furthest.xStart){
      furthest = cur;
    }
  }
  return furthest;
}

export const furthestLeftPlatform = (platforms) => {
  let platformsArr = Object.values(platforms);
  // let furthest = {id: null, xStart: null};
  let furthest = null;
  for(let i = 0; i < platformsArr.length; i++){
    let cur = platformsArr[i];
    // if(!furthest || cur.xStart < furthest.xStart){
    //   furthest = cur;
    // }
    if(!furthest){
      furthest = cur;
    }else if(cur.xStart < furthest.xStart){
      furthest = cur;
    }
  }
  return furthest;
}