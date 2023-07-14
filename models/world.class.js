class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bottle;
  reload = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  endBossStatus = new EndBossStatus();
  throwableObject = [];
  Intervals = [];
  allIntervals = []
  lastThrowTime;
  endFight = false;
  audio = true;



  setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.Intervals.push(id);
}

  clearIntervals() {
    this.Intervals.forEach(clearInterval);
    this.character.clearIntervals();
}

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.lastThrowTime = new Date().getTime();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.setStopableInterval(() => {
      this.checkCollisionsAll();
      this.deleteThrowObject();
    }, 100);
  }
  
  checkCollisionsAll(){
    this.checkCollisions();
    this.checkCollectingBottle();
    this.checkCollectingCoins();
    this.checkEnemy();
    this.checkThrowObject();
    this.endbossFight();
    this.setStopableInterval(()=>{
      this.collisionWithThrowableObject();
    }, 100)
  }

  enemyDead(enemy){
    enemy.isDead = true;
    let Time = new Date().getTime() + 500;
    clearInterval(enemy.StartImageInterval);
    this.character.jump();
    let interval = setInterval(() => {
        enemy.speed = 0;
        enemy.playAnimation(enemy.IMAGES_DEAD);
        if (this.audio) {
          enemy.chicken_sound.play();
      }
        let checkDate = new Date().getTime();
        if (checkDate > Time) {
            enemy.delete = true;
            clearInterval(interval);
        }
    }, 100);
    enemy.setStopableInterval();
}

checkEnemy() {
    this.level.enemies = this.level.enemies.filter(e => !e.delete);
    this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && !enemy.isDead) {
            if (enemy instanceof Chicken) {
                this.enemyDead(enemy);
            } else if (enemy instanceof EndBoss || enemy instanceof Chicken) {
              this.character.hit();
              this.statusBar.setPercentage(this.character.energy);
            }
        } 
    });
}

endbossFight() {
  this.level.enemies.forEach(enemy => {
      if (enemy instanceof EndBoss && this.character.x >= 3000 || enemy.activate) {
          if (enemy.energy > 0 && !enemy.isHurt()) {
              enemy.run(this.character)
          }
          this.endFight = true;
          enemy.activate = true;
      }
  });
}


collisionWithThrowableObject() {
  this.throwableObject.forEach(bottle => {
      this.level.enemies.forEach(e => {
          this.bottleHitsEnemy(e, bottle);
          this.bottleHitsGround(bottle);
          this.bottleHitsEndboss(e)
      });
  });
}

bottleHitsEnemy(e, bottle) {
  if (e.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround()) {
      e.hit(100);
      bottle.hit(100);
      if (this.audio) {
          bottle.bottle_splash.play();
      }
  };
}

bottleHitsGround(bottle) {
  if (!bottle.isAboveGround()) {
      bottle.speedX = 0;
      if (this.audio && bottle.energy > 0) {
        bottle.bottle_splash.play();
      }
  }
}

bottleHitsEndboss(e) {
  if (e instanceof EndBoss) {
    this.endBossStatus.setPercentage(e.energy / 4.5, this.endBossStatus.IMAGES_ENDBOSSLIFE);
  }
}

  checkThrowObject() {
    let checkReloteTime = new Date().getTime();
    let bottle = new ThrowableObject(
      this.character.x + 60,
      this.character.y + 100
    );
    if (this.keyboard.D && this.character.setBottle > 0 && checkReloteTime > this.reload) {
      this.reload = new Date().getTime() + 500;
      this.character.setBottle -= 1;
      this.throwableObject.push(bottle);
      this.statusBarBottle.setBottle -= 1;
      this.statusBarBottle.setPercentage(this.character.setBottle);
    }
  }

  checkCollectingCoins() {
    this.level.coins.forEach((coins) => {
      if (this.character.isColliding(coins)) {
        this.character.setCoins++;
        if(this.audio){
          coins.coin_sound.play();
          setTimeout(()=> {
            coins.coin_sound.pause();
        }, 300);
        }
        this.statusBarCoins.setPercentage(this.character.setCoins);
        this.deleteCollectableCoin(coins);
      }
    });
  }

  checkCollectingBottle() {
    this.level.bottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.setBottle++;
        if(this.audio){
          bottle.bottle_sound.play();
          setTimeout(()=> {
            bottle.bottle_sound.pause();
          }, 600);
        }
        this.statusBarBottle.setPercentage(this.character.setBottle);
        this.deleteCollectableBottle(bottle);
      }
    });
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
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

  deleteThrowObject() {
    for (let i = 0; i < this.throwableObject.length; i++) {
        if (this.throwableObject[i].energy == 0 && !this.throwableObject[i].deleted || !this.throwableObject[i].isAboveGround() && !this.throwableObject[i].deleted) {
            this.throwableObject[i].deleted = true;
            setTimeout(() => {
                if (this.throwableObject[i].deleted) {
                    this.throwableObject[i].clearIntervals()
                    this.throwableObject.splice(i, 1)
                }
            }, 200);
        }
    }
}

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottle);
    if(this.endFight){
      this.addToMap(this.endBossStatus);
    }
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
