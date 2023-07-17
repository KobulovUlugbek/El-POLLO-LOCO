/**
 * Klasse für ein Hintergrundobjekt.
 * Erbt von der Klasse MovableObjekt.
 */
class BackgroundObject extends MovableObjekt {
  /**
   * Breite des Hintergrundobjekts.
   * @type {number}
   */
  width = 720;

  /**
   * Höhe des Hintergrundobjekts.
   * @type {number}
   */
  height = 480;

  /**
   * Erzeugt eine Instanz eines Hintergrundobjekts.
   * @param {string} imagePath - Der Pfad zum Bild des Hintergrundobjekts.
   * @param {number} x - Die X-Koordinate des Hintergrundobjekts.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);

    /**
     * Die X-Koordinate des Hintergrundobjekts.
     * @type {number}
     */
    this.x = x;

    /**
     * Die Y-Koordinate des Hintergrundobjekts.
     * Die Y-Koordinate wird so gesetzt, dass das Hintergrundobjekt am unteren Rand des Bildschirms angezeigt wird.
     * @type {number}
     */
    this.y = 480 - this.height;
  }
}
