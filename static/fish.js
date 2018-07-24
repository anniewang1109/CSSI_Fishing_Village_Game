

class Fish(){
  let x = 0; //change to start x
  let y = 0; //change to start y
  let nextX = 0;
  let nextY = 0;
  let level = 0;
  let speed = 0;
  let strength = 0;
  let frame = -1;
  let direction = 0;

  constructor(setLevel){
    level = setLevel;
    strength = level;
    setFishSpeed();
  }

  function getNextXY(){
    x = nextX;
    y = nextY;
    //logic that follows path for nextX and nextY
    //sets Direction
  }

  function setFishSpeed(){
    switch (strength) {
      case 1:
        speed = 5; //fix speed eventually
        break;
      case 2:
        speed = 10; //fix speed eventually
        break;
      case 3:
        speed = 20; //fix speed eventually
        break;
    }
  }

  //Returns src of image for sprite sheet and the frame
  function getSSF(){
    frame = (frame + 1) % 3;
    //Depending on the track part it will return a differnt sprite.
    switch (level) {
      case 1:
        return [getRed(), frame];
      case 2:
        return [getBlue(), frame];
      case 3:
        return [getYellow(), frame];
    }
  }

  function getRed(){
    switch (direction) {
      case 0:
        return "/imgs/red_fish_right.png";
      case 1:
        return "/imgs/red_fish_up.png";
      case 2:
        return "/imgs/red_fish_left.png";
      case 3:
        return "/imgs/red_fish_down.png";
    }
  }

  function getBlue(){
    switch (direction) {
      case 0:
        return "/imgs/blue_fish_right.png";
      case 1:
        return "/imgs/blue_fish_up.png";
      case 2:
        return "/imgs/blue_fish_left.png";
      case 3:
        return "/imgs/blue_fish_down.png";
    }
  }

  function getYellow(){
    switch (direction) {
      case 0:
        return "/imgs/yellow_fish_right.png";
      case 1:
        return "/imgs/yellow_fish_up.png";
      case 2:
        return "/imgs/yellow_fish_left.png";
      case 3:
        return "/imgs/yellow_fish_down.png";
    }
  }

  function setCaught(){
    strength--;
    if(strength!=0){
      setFishSpeed();
    }else{
      return false; //fish has been caught
    }
    return true; //fish has got away
  }

}
