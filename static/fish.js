class Fish{

  constructor(setLevel){
    this.xPos = 50; //change to start x
    this.yPos = 0; //change to start y
    this.nextX = 51;
    this.nextY = 0;
    this.level = setLevel;
    this.strength = setLevel;
    this.currentFrame = -1;
    this.direction = 3;
    switch (this.strength) {
      case 1:
        this.speed = 5; //fix speed eventually
        break;
      case 2:
        this.speed = 10; //fix speed eventually
        break;
      case 3:
        this.speed = 20; //fix speed eventually
        break;
    }
  }

  moveFish(){
    this.xPos = this.nextX;
    this.yPos = this.nextY;
    this.nextY += 1;
    //logic that follows path for nextX and nextY
    //sets Direction
  }

  setFishSpeed(){
    switch (this.strength) {
      case 1:
        this.speed = 5; //fix speed eventually
        break;
      case 2:
        this.speed = 10; //fix speed eventually
        break;
      case 3:
        this.speed = 20; //fix speed eventually
        break;
    }
  }

  //Returns src of image for sprite sheet and the frame
  getSSF(){
    this.currentFrame = (this.currentFrame + 1) % 3;
    //Depending on the track part it will return a differnt sprite.
    switch (this.level) {
      case 1:
        return [this.getRed(), this.currentFrame];
      case 2:
        return [this.getBlue(), this.currentFrame];
      case 3:
        return [this.getYellow(), this.currentFrame];
    }
  }

 getRed(){
    switch (this.direction) {
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

 getBlue(){
    switch (this.direction) {
      case 0:
        return "/imgs/blue_fish_right.png";
      case 1:
        return "/imgs/blue_fish_up.png";
      case 2:
        return "/imgs/blue_fish_left.png";
      case 3:
        return "/static/imgs/blue_fish_down.png";
    }
  }

 getYellow(){
    switch (this.direction) {
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

  setCaught(){
    this.strength--;
    if(this.strength!=0){
      setFishSpeed();
    }else{
      return false; //fish has been caught
    }
    return true; //fish has got away
  }

}
