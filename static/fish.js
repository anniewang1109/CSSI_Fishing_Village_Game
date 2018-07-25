class Fish{

  constructor(setLevel){
    this.state = 0;
    this.direction = -1;
    this.strength = setLevel;
    this.setFishSpeed();
    this.moveFish();
    this.currentFrame = 0;
    this.images = [];
    for(let i = 0; i<3; i++){
      this.images.push(new Image());
      this.images[i].src = "/static/imgs/" + this.getSS(setLevel,i) + ".png";
    }

  }

  moveFish(){
    this.currentFrame = (this.currentFrame + 1) % 4;
    switch(this.direction){
      case -1://init
        this.offsetX = (-Math.random()*20 + 10);
        this.offsetY = (-Math.random()*20 + 10);
        this.xPos = -32 + this.offsetX;
        this.yPos = 485 + this.offsetY;
        this.direction = 0;
      case 0: //right
        this.xPos = this.xPos + this.speed;
        this.yPos = this.yPos;
        break;
      case 1: //up
        this.xPos = this.xPos;
        this.yPos = this.yPos - this.speed; //2.5
        break;
      case 2: //down
        this.xPos = this.xPos;
        this.yPos = this.yPos + this.speed; //2.5
        break;
    }
    switch(this.state){
      case 0:
        if(this.xPos>355 + this.offsetX && this.xPos<365 + this.offsetX){ //center at 356
          this.direction = 1;
          this.state++;
        }
        break;
      case 1:
        if(this.yPos>265 - this.offsetY && this.yPos<275 - this.offsetY){ //center at 273
          this.direction = 0;
          this.state++;
        }
        break;
      case 2:
        if(this.xPos>560 + this.offsetX && this.xPos<570 + this.offsetX){ //center at 564
         this.direction = 2;
         this.state++;
        }
        break;
      case 3:
        if(this.yPos>605 + this.offsetY && this.yPos<615 + this.offsetY){ //center at 609
         this.direction = 0;
         this.state++;
        }
        break;
      case 4:
        if(this.xPos>760 + this.offsetX && this.xPos<770 + this.offsetX){ //center at 760
         this.direction = 1;
         this.state++;
        }
        break;
      case 5:
        if(this.yPos>150 - this.offsetY && this.yPos<160 - this.offsetY){ // center at 157
         this.direction = 0;
         this.state++;
        }
        break;
      case 6:
        if(this.xPos>970 + this.offsetX && this.xPos<980 + this.offsetX){ // center at 972
         this.direction = 2;
         this.state++;
        }
        break;
      case 7:
        if(this.yPos>470 + this.offsetY && this.yPos<480 + this.offsetY){ //center at 473
         this.direction = 0;
         this.state++;
        }
        break;
      case 8:
        if(this.xPos>1440){
         this.state++;
        }
        break;
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
        this.timeSetting = 120; //fix speed eventually
        this.speed = 3;
        break;
      case 2:
        this.timeSetting = 100; //fix speed eventually
        this.speed = 4;
        break;
      case 3:
        this.timeSetting = 80; //fix speed eventually
        this.speed = 5;
        break;
    }
  }

  //Returns src of image for sprite sheet
  getSS(level,i){
    //Depending on the track part it will return a differnt sprite.
    switch (level) {
      case 1:
        return ["red_fish_right", "red_fish_up", "red_fish_down"][i];
      case 2:
        return ["blue_fish_right", "blue_fish_up", "blue_fish_down"][i];
      case 3:
        return ["yellow_fish_right", "yellow_fish_up", "yellow_fish_down"][i];
    }
  }

  setCaught(){
    this.strength  -= 1;
    if(this.strength>0){
      this.setFishSpeed();

    }else{
      this.state = 9;
    }
  }

}
