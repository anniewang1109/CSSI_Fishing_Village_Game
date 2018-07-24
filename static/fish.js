class Fish{

  constructor(setLevel){
    this.state = 0;
    this.direction = -1;
    this.moveFish();
    this.strength = setLevel;
    this.currentFrame = 0;
    this.images = [];
    for(let i = 0; i<3; i++){
      this.images.push(new Image());
      this.images[i].src = "/static/imgs/" + this.getSS(setLevel,i) + ".png";
    }
    this.setFishSpeed();
  }

  moveFish(){
    //console.log(screen.width + " : " + screen.height);

    //this.currentFrame = (this.currentFrame + 1) % 4;
    switch(this.direction){
      case -1://init
        this.xPos = 0;
        this.yPos = 485;
        this.direction = 0;
      case 0: //right
        this.xPos = this.xPos + 4;
        this.yPos = this.yPos;
        break;
      case 1: //up
        this.xPos = this.xPos;
        this.yPos = this.yPos - 4;
        break;
      case 2: //down
        this.xPos = this.xPos;
        this.yPos = this.yPos + 4;
        break;
    }
    switch(this.state){
      case 0:
        if(this.xPos>355 && this.xPos<365){ //center at 355
          this.direction = 1;
          this.state++;
        }
        break;
      case 1:
        if(this.yPos>265 && this.yPos<275){ //center at 275
          this.direction = 0;
          this.state++;
        }
        break;
      case 2:
        if(this.xPos>560 && this.xPos<570){ //center at 560
         this.direction = 2;
         this.state++;
        }
        break;
      case 3:
        if(this.yPos>605 && this.yPos<615){ //center at 605
         this.direction = 0;
         this.state++;
        }
        break;
      case 4:
        if(this.xPos>620 && this.xPos<610){ //center at 
         this.direction = 1;
         this.state++;
        }
        break;
      case 5:
        if(this.yPos>80 && this.yPos<90){
         this.direction = 0;
         this.state++;
        }
        break;
      case 6:
        if(this.xPos>335 && this.xPos<345){
         this.direction = 2;
         this.state++;
        }
        break;
      case 7:
        if(this.yPos>260 && this.yPos<270){
         this.direction = 0;
         this.state++;
        }
        break;
      //case 8:

    }

    //sets Direction ||  idicated threshold buffer current buffer = 20
    //Start right x = 0, y=460
    //turn up after x = 370 || 360,380
    //turn right after y = 270 || 260,280
    //turn down after x = 580 || 570,590
    //turn right after y = 580 || 570,590
    //turn up after x = 780 || 770,790
    //turn right after y = 160 || 150,170
    //turn down after x = 990 || 980,1000
    //turn right after y = 450 || 440,460
  }


  setFishSpeed(){
    switch (this.strength) {
      case 1:
        this.speed = 400; //fix speed eventually
        break;
      case 2:
        this.speed = 50; //fix speed eventually
        break;
      case 3:
        this.speed = 200; //fix speed eventually
        break;
    }
  }

  //Returns src of image for sprite sheet
  getSS(level,i){

    //Depending on the track part it will return a differnt sprite.
    switch (level) {
      case 1:
        return this.getRed(i);
      case 2:
        return this.getBlue(i);
      case 3:
        return this.getYellow(i);
    }
  }

 getRed(i){
    switch (i) {
      case 0:
        return "red_fish_right";
      case 1:
        return "red_fish_up";
      case 2:
        return "red_fish_down";
    }
  }

 getBlue(i){
    switch (i) {
      case 0:
        return "blue_fish_right";
      case 1:
        return "blue_fish_up";
      case 2:
        return "blue_fish_down";
    }
  }

 getYellow(i){
    switch (i) {
      case 0:
        return "yellow_fish_right";
      case 1:
        return "yellow_fish_up";
      case 2:
        return "yellow_fish_down";
    }
  }

  setCaught(i){
    this.strength--;
    if(this.strength!=0){
      setFishSpeed();
    }else{
      return false; //fish has been caught
    }
    return true; //fish has got away
  }

}
