class Fish{

  constructor(setLevel){
    this.xPos = 100; //change to start x
    this.yPos = 100; //change to start y
    this.nextX = 200;
    this.nextY = 200;
    this.level = setLevel;
    this.strength = setLevel;
    this.currentFrame = 0;
    this.images = [];
    for(let i = 0; i<4; i++){
      this.direction = i;
      this.images.push(new Image());
      this.images[i].src = "/static/imgs/" + this.getSS() + ".png";
    }
    this.setFishSpeed();
  }

  moveFish(){
    this.currentFrame = (this.currentFrame + 1) % 4;
    this.xPos = this.nextX;
    this.yPos = this.nextY;
    this.nextY += 4;
    //logic that follows path for nextX and nextY
    //sets Direction
  }

  setFishSpeed(){
    switch (this.strength) {
      case 1:
        this.speed = 400; //fix speed eventually
        break;
      case 2:
        this.speed = 300; //fix speed eventually
        break;
      case 3:
        this.speed = 200; //fix speed eventually
        break;
    }
  }

  //Returns src of image for sprite sheet
  getSS(){

    //Depending on the track part it will return a differnt sprite.
    switch (this.level) {
      case 1:
        return this.getRed();
      case 2:
        return this.getBlue();
      case 3:
        return this.getYellow();
    }
  }

 getRed(){
    switch (this.direction) {
      case 0:
        return "red_fish_right";
      case 1:
        return "red_fish_up";
      case 2:
        return "red_fish_left";
      case 3:
        return "red_fish_down";
    }
  }

 getBlue(){
    switch (this.direction) {
      case 0:
        return "blue_fish_right";
      case 1:
        return "blue_fish_up";
      case 2:
        return "blue_fish_left";
      case 3:
        return "blue_fish_down";
    }
  }

 getYellow(){
    switch (this.direction) {
      case 0:
        return "yellow_fish_right";
      case 1:
        return "yellow_fish_up";
      case 2:
        return "yellow_fish_left";
      case 3:
        return "yellow_fish_down";
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

  getTimer(){
    return this.timer;
  }

}
