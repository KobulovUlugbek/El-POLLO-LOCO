class ThrowableObject extends MovableObjekt {
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  deleted = false;
  speedX = 5;
  otherDirection = false;

  SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
  ];
  SPIN = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
  ];

  bottle_splash = new Audio("audio/bottle_splash.mp3");

  constructor(x, y, otherDirection) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.SPLASH);
    this.loadImages(this.SPIN);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
    this.animate();
    this.otherDirection = otherDirection;
  }

  animate() {
    setInterval(() => {
      if (this.isHurt() || !this.isAboveGround()) {
        this.playAnimation(this.SPLASH);
      }
    }, 200);

    setInterval(() => {
      if (!this.isHurt() && this.isAboveGround()) {
        this.playAnimation(this.SPIN);
      }
    }, 100);
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      if (this.otherDirection === false) {
        this.x += 10;
      } else {
        this.x -= 10;
      }
    }, 25);
  }
}
