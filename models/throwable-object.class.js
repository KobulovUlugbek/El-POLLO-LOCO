/**
 * Klasse für ein werfbares Objekt.
 * Erbt von der Klasse "MovableObjekt".
 */
class ThrowableObject extends MovableObjekt {
  /**
   * Offset-Werte für die Kollisionserkennung.
   * @type {Object}
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  /**
   * Flag, das angibt, ob das Objekt gelöscht wurde.
   * @type {boolean}
   */
  deleted = false;

  /**
   * Geschwindigkeit in horizontaler Richtung.
   * @type {number}
   */
  speedX = 5;

  /**
   * Flag, das angibt, ob das Objekt in die andere Richtung zeigt.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * Array der Bildpfade für den Spritz-Effekt.
   * @type {string[]}
   */
  SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
  ];

  /**
   * Array der Bildpfade für die Rotation des Objekts.
   * @type {string[]}
   */
  SPIN = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
  ];

  /**
   * Audio-Element für den Spritz-Sound.
   * @type {Audio}
   */
  bottle_splash = new Audio("audio/bottle_splash.mp3");

  /**
   * Konstruktor der ThrowableObject-Klasse.
   * @param {number} x - Die x-Koordinate des Objekts.
   * @param {number} y - Die y-Koordinate des Objekts.
   * @param {boolean} otherDirection - Flag, das angibt, ob das Objekt in die andere Richtung zeigt.
   */
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

  /**
   * Animiert das Objekt, indem die entsprechenden Animationen abgespielt werden.
   */
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

  /**
   * Wirft das Objekt durch Anpassung der Geschwindigkeit und Anwendung der Schwerkraft.
   */
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
