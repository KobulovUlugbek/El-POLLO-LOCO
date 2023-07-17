/**
 * Klasse für ein Huhn.
 * Erbt von der Klasse MovableObjekt.
 * @extends MovableObjekt
 */
class Chicken extends MovableObjekt {
  /**
   * Y-Koordinate des Huhns.
   * @type {number}
   */
  y = 380;

  /**
   * Breite des Huhns.
   * @type {number}
   */
  width = 50;

  /**
   * Höhe des Huhns.
   * @type {number}
   */
  height = 60;

  /**
   * Intervalldauer für das Bewegen des Huhns.
   * @type {number}
   */
  StartImageInterval;

  /**
   * Gibt an, ob das Huhn tot ist.
   * @type {boolean}
   */
  isDead = false;

  /**
   * Gibt an, ob das Huhn gelöscht werden soll.
   * @type {boolean}
   */
  delete = false;

  /**
   * Array mit den Bildpfaden für die Laufanimation des Huhns.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
  ];

  /**
   * Array mit den Bildpfaden für die Tod-Animation des Huhns.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];

  /**
   * Audioelement für den Klang des Huhns.
   * @type {Audio}
   */
  chicken_sound = new Audio("audio/chicken_small.mp3");

  /**
   * Erzeugt eine Instanz eines Huhns.
   */
  constructor() {
    super().loadImage(
      "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );

    this.x = 720 + Math.random() * 3500;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.25 + Math.random() * 0.4;
    this.applyGravity();
    this.animate();
  }

  /**
   * Führt die Animation des Huhns aus.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    this.StartImageInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 160);
  }
}
