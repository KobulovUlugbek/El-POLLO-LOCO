/**
 * Klasse für eine Flasche.
 * Erbt von der Klasse MovableObjekt.
 */
class Bottle extends MovableObjekt {
  /**
   * Höhe der Flasche.
   * @type {number}
   */
  height = 100;

  /**
   * Breite der Flasche.
   * @type {number}
   */
  width = 100;

  /**
   * X-Koordinate der Flasche.
   * @type {number}
   */
  x = 250;

  /**
   * Y-Koordinate der Flasche.
   * @type {number}
   */
  y = 200;

  /**
   * Offset der Flasche.
   * @type {Object}
   * @property {number} top - Oberer Offset-Wert.
   * @property {number} left - Linker Offset-Wert.
   * @property {number} right - Rechter Offset-Wert.
   * @property {number} bottom - Unterer Offset-Wert.
   */
  offset = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 10
  };

  /**
   * Array mit den Bildpfaden für die Flasche.
   * @type {string[]}
   */
  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
  ];

  /**
   * Audioelement für den Flaschenklang.
   * @type {Audio}
   */
  bottle_sound = new Audio("audio/bottle.mp3");

  /**
   * Erzeugt eine Instanz einer Flasche.
   */
  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);

    // Zufällige X- und Y-Koordinaten für die Flasche
    this.x = 250 + Math.random() * 3000;
    this.y = 340 - Math.random();

    // Startet die Animation der Flasche
    this.animate();
  }

  /**
   * Führt die Animation der Flasche aus.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 160);
  }
}
