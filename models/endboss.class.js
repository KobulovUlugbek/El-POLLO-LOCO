class EndBoss extends MovableObjekt {
  height = 500;
  width = 350;
  y = -40;
  activate = false;
  energy = 500;
  speed = 20;
  offset = {
    top: 80,
    left: 50,
    right: 50,
    bottom: 10
  };

  right = false;

  WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png"
  ];

  IDLE = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png"
  ];

  HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png"
  ];

  DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png"
  ];

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.WALKING);
    this.loadImages(this.HURT);
    this.loadImages(this.DEAD);
    this.loadImages(this.IDLE);
    this.x = 3700;
    this.animate();
  }

  boss_sound = new Audio("audio/chicken.mp3");

  run(character) {
    if (this.x > character.x - 300 && !this.right) {
      this.moveLeft(24);
      this.otherDirection = false;
      if (this.x <= character.x - 100) {
        this.right = true;
      }
    } else if (this.x < character.x + 300 && this.right) {
      this.moveRight(24);
      this.otherDirection = true;
      if (this.x >= character.x) {
        this.right = false;
      }
    }
  }

  animate() {
    this.setStopableInterval(() => {
      if (this.energy <= 0) {
        this.playAnimation(this.DEAD);

        if (this.energy <= 0) {
          this.boss_sound.play();

          setTimeout(() => {
            this.boss_sound.pause();
          }, 1000);
        }
      } else if (this.activate && !this.isHurt()) {
        this.playAnimation(this.WALKING);
      } else if (this.isHurt()) {
        this.playAnimation(this.HURT);
      } else {
        this.playAnimation(this.IDLE);
      }
    }, 200);
  }
}
