class MovableObjekt extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  setCoins = 0;
  setBottle = 0;
  Intervals = [];
  deleted = false;
  world;


  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };


  
  setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.Intervals.push(id);
}

clearIntervals() {
    this.Intervals.forEach(clearInterval);
}

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject || this instanceof Chicken) {
      return this.y < 380;
    } else {
      return this.y < 215;
    }
  }

  /*   isColliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
  } */

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y &&
      this.x + this.offset.bottom < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    let Time =  new Date().getTime() + 2000
    if( Time > this.lastHit){
    this.energy -= 5;
    if (this.energy < 0) {
        this.energy = 0;
    } else {
        this.lastHit = new Date().getTime();
    }
}
}

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight(speed) {
    if (speed) {
        this.speed = speed;
    }
    this.x += this.speed;
  }

  moveLeft(speed) {
  if (speed) {
      this.speed = speed;
  }
  this.x -= this.speed;
  }

  jump(low) {
    if (low) {
        this.speedY = 20;
    } else {
        this.speedY = 25;
    }
}

  rushAttack() {
    this.speed = 3;
    if (!this.isAboveGround()) {
      this.jump('low')  
    }        
}
}