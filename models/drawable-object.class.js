/**
 * Klasse für ein zeichnbares Objekt.
 */
class DrawableObject {
  /**
   * Bild des Objekts.
   * @type {Image}
   */
  img;

  /**
   * Bildcache für das Objekt.
   * @type {Object}
   */
  imageCache = {};

  /**
   * Aktuelles Bildindex des Objekts.
   * @type {number}
   */
  currentImage = 0;

  /**
   * X-Koordinate des Objekts.
   * @type {number}
   */
  x = 120;

  /**
   * Y-Koordinate des Objekts.
   * @type {number}
   */
  y = 215;

  /**
   * Höhe des Objekts.
   * @type {number}
   */
  height = 220;

  /**
   * Breite des Objekts.
   * @type {number}
   */
  width = 110;

  /**
   * Lädt ein Bild für das Objekt.
   * @param {string} path - Der Pfad zum Bild.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Lädt mehrere Bilder für das Objekt in den Bildcache.
   * @param {string[]} arr - Ein Array mit Pfaden zu den Bildern.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Zeichnet das Objekt auf den angegebenen Kontext.
   * @param {CanvasRenderingContext2D} ctx - Der Kontext zum Zeichnen.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Zeichnet den Rahmen des Objekts auf den angegebenen Kontext.
   * @param {CanvasRenderingContext2D} ctx - Der Kontext zum Zeichnen.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof EndBoss ||
      this instanceof ThrowableObject
      /*       this instanceof Coin
       */
    ) {
      ctx.beginPath();
      ctx.lineWidth = "0";
      ctx.strokeStyle = "transparent";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
