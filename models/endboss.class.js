/**
 * Klasse für den Endboss.
 * Erbt von der Klasse MovableObjekt.
 * @extends MovableObjekt
 */
class EndBoss extends MovableObjekt {
  /**
   * Höhe des Endbosses.
   * @type {number}
   */
  height = 500;

  /**
   * Breite des Endbosses.
   * @type {number}
   */
  width = 350;

  /**
   * Y-Koordinate des Endbosses.
   * @type {number}
   */
  y = -40;

  /**
   * Aktivierungszustand des Endbosses.
   * @type {boolean}
   */
  activate = false;

  /**
   * Energie des Endbosses.
   * @type {number}
   */
  energy = 500;

  /**
   * Geschwindigkeit des Endbosses.
   * @type {number}
   */
  speed = 20;

  /**
   * Offset des Endbosses.
   * @type {Object}
   * @property {number} top - Oberer Offset-Wert.
   * @property {number} left - Linker Offset-Wert.
   * @property {number} right - Rechter Offset-Wert.
   * @property {number} bottom - Unterer Offset-Wert.
   */
  offset = {
    top: 80,
    left: 50,
    right: 50,
    bottom: 10
  };

  /**
   * Richtung des Endbosses.
   * @type {boolean}
   */
  right = false;

  /**
   * Array mit den Bildpfaden für die Laufanimation des Endbosses.
   * @type {string[]}
   */
  WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png"
  ];

  /**
   * Array mit den Bildpfaden für die Alarm-Animation des Endbosses.
   * @type {string[]}
   */
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

  /**
   * Array mit den Bildpfaden für die Verletzt-Animation des Endbosses.
   * @type {string[]}
   */
  HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png"
  ];

  /**
   * Array mit den Bildpfaden für die Tod-Animation des Endbosses.
   * @type {string[]}
   */
  DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png"
  ];

  /**
   * Erzeugt eine Instanz des Endbosses.
   */
  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.WALKING);
    this.loadImages(this.HURT);
    this.loadImages(this.DEAD);
    this.loadImages(this.IDLE);
    this.x = 3700;
    this.animate();
  }

  /**
   * Audioelement für den Bossklang.
   * @type {Audio}
   */
  boss_sound = new Audio("audio/chicken.mp3");

  /**
   * Führt die Aktion des Endbosses aus, um dem Charakter zu folgen.
   * @param {Character} character - Der Charakter, dem der Endboss folgen soll.
   */
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

  /**
   * Führt die Animation des Endbosses aus.
   */
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
