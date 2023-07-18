/**
 * Klasse für einen Charakter.
 * Erbt von der Klasse MovableObjekt.
 */
class Character extends MovableObjekt {
  /**
   * Höhe des Charakters.
   * @type {number}
   */
  height = 210;

  /**
   * Y-Koordinate des Charakters.
   * @type {number}
   */
  y = 115;

  /**
   * Geschwindigkeit des Charakters.
   * @type {number}
   */
  speed = 10;

  /**
   * Anzahl der gesammelten Münzen.
   * @type {number}
   */
  setCoins = 0;

  /**
   * Anzahl der gesammelten Flaschen.
   * @type {number}
   */
  setBottle = 0;

  /**
   * Referenz zur Welt.
   * @type {World}
   */
  world;

  /**
   * Offset des Charakters.
   * @type {Object}
   * @property {number} top - Oberer Offset-Wert.
   * @property {number} bottom - Unterer Offset-Wert.
   * @property {number} left - Linker Offset-Wert.
   * @property {number} right - Rechter Offset-Wert.
   */
  offset = {
    top: 100,
    bottom: -40,
    left: 10,
    right: 45
  };

  /**
   * Array mit den Bildpfaden für die Laufanimation des Charakters.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png"
  ];

  /**
   * Array mit den Bildpfaden für die Sprunganimation des Charakters.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png"
  ];

  /**
   * Array mit den Bildpfaden für die Idle-Animation des Charakters.
   * @type {string[]}
   */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png"
  ];

  /**
   * Array mit den Bildpfaden für die Lang-Idle-Animation des Charakters.
   * @type {string[]}
   */
  IMAGES_LONGIDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png"
  ];

  /**
   * Array mit den Bildpfaden für die Tod-Animation des Charakters.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png"
  ];

  /**
   * Array mit den Bildpfaden für die Verletzt-Animation des Charakters.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png"
  ];

  /**
   * Audioelement für den Laufklang des Charakters.
   * @type {Audio}
   */
  walking_sound = new Audio("audio/walking.mp3");

  /**
   * Audioelement für den Sprungklang des Charakters.
   * @type {Audio}
   */
  jump_sound = new Audio("audio/jump.mp3");

  /**
   * Erzeugt eine Instanz eines Charakters.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
    this.move();
  }

  /**
   * Führt die Bewegung des Charakters aus.
   */
  move() {
    this.setStopableInterval(() => {
      this.walking_sound.pause();
      this.moveToRight();
      this.moveToLeft();
      this.characterJump();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Bewegt den Charakter nach rechts.
   */
  moveToRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.walking_sound.play();
      this.otherDirection = false;
      this.setLastMoveTime();
      if (this.world.audio) {
        this.walking_sound.play();
      } else {
        this.walking_sound.pause();
      }
    }
  }

  /**
   * Bewegt den Charakter nach links.
   */
  moveToLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.walking_sound.play();
      this.otherDirection = true;
      this.setLastMoveTime();
      if (this.world.audio) {
        this.walking_sound.play();
      } else {
        this.walking_sound.pause();
      }
    }
  }

  /**
   * Lässt den Charakter springen.
   */
  characterJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.jump_sound.play();
      this.setLastMoveTime();
      if (this.world.audio) {
        this.jump_sound.play();
      } else {
        this.jump_sound.pause();
      }
    }
  }

  /**
   * Führt die Animation des Charakters aus.
   */
  animate() {
    this.setStopableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.checkIdleTime()) {
        this.playAnimation(this.IMAGES_LONGIDLE);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 100);
  }

  /**
   * Setzt die Zeit des letzten Bewegungszeitpunkts.
   */
  setLastMoveTime() {
    this.lastMoveTime = new Date().getTime();
  }

  /**
   * Überprüft, ob die Zeitspanne für die Idle-Animation erreicht wurde.
   * @returns {boolean} - Gibt an, ob die Idle-Animation abgespielt werden soll.
   */
  checkIdleTime() {
    let idleTime = new Date().getTime() - this.lastMoveTime;
    idleTime = idleTime / 500;
    return idleTime > 6;
  }
}
