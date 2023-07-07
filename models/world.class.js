class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  throwableObject = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }


  run(){
    setInterval(()=> {
      this.checkCollectingCoins();
      this.checkCollectingBottle();
        this.checkCollisions();
        this.checkThrowObject();
    }, 200);
  }

  checkThrowObject(){
    if(this.keyboard.D){
        let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 100);
        this.throwableObject.push(bottle);
    }
  }
  
  checkCollectingCoins() {
    this.level.coins.forEach((coins) => {
        if (this.character.isColliding(coins)) {
            this.character.setCoins++;
            this.statusBarCoins.setPercentage(this.character.setCoins);
            this.deleteCollectableCoin(coins);
        }
    })
}
checkCollectingBottle() {
  this.level.bottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
          this.character.setBottle++;
          this.statusBarBottle.setPercentage(this.character.setBottle);
          this.deleteCollectableBottle(bottle);
      }
  })
}

  checkCollisions(){
    this.level.enemies.forEach((enemy) =>{
        if( this.character.isColliding(enemy)){
         this.character.hit();
         this.statusBar.setPercentage(this.character.energy);
        }
     });
  }

  deleteCollectableCoin(coin) {
    this.level.coins.splice(this.level.coins.indexOf(coin), 1);
}
  deleteCollectableBottle(bottle) {
  this.level.bottle.splice(this.level.bottle.indexOf(bottle), 1);
}



  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottle);
    this.ctx.translate(this.camera_x, 0);



    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottle);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);

    this.ctx.translate(-this.camera_x, 0);

    //Draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
