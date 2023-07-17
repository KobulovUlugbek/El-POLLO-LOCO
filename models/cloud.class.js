/**
 * Klasse für eine Wolke.
 * Erbt von der Klasse MovableObjekt.
 * @extends MovableObjekt
 */
class Cloud extends MovableObjekt {
  /**
   * Y-Koordinate der Wolke.
   * @type {number}
   */
  y = 10;

  /**
   * Breite der Wolke.
   * @type {number}
   */
  width = 510;

  /**
   * Höhe der Wolke.
   * @type {number}
   */
  height = 310;

  /**
   * Geschwindigkeit der Wolke.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Erzeugt eine Instanz einer Wolke.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 5000;
    this.animate();
  }

  /**
   * Führt die Animation der Wolke aus.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
