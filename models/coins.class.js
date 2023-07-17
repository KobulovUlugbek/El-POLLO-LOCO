/**
 * Klasse für eine Münze.
 * Erbt von der Klasse MovableObjekt.
 * @extends MovableObjekt
 */
class Coin extends MovableObjekt {
  /**
   * Höhe der Münze.
   * @type {number}
   */
  height = 100;

  /**
   * Breite der Münze.
   * @type {number}
   */
  width = 100;

  /**
   * X-Koordinate der Münze.
   * @type {number}
   */
  x = 250;

  /**
   * Y-Koordinate der Münze.
   * @type {number}
   */
  y = 300;


  offset = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 10
  };

  /**
   * Array mit den Bildpfaden für die Münzanimation.
   * @type {string[]}
   */
  IMAGES_COINS = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png"
  ];

  /**
   * Audioelement für den Münzklang.
   * @type {Audio}
   */
  coin_sound = new Audio("audio/coin.mp3");

  /**
   * Erzeugt eine Instanz einer Münze.
   */
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = 250 + Math.random() * 3000;
    this.y = 350 - Math.random() * 200;
    this.animate();
  }

  /**
   * Führt die Animation der Münze aus.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 160);
  }
}
