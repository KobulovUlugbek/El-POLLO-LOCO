/**
 * Klasse zur Steuerung des Spiels über Tastatur- oder Touch-Eingabe.
 */
class Keyboard {
  /**
   * Status der linken Pfeiltaste.
   * @type {boolean}
   */
  LEFT = false;

  /**
   * Status der rechten Pfeiltaste.
   * @type {boolean}
   */
  RIGHT = false;

  /**
   * Status der oberen Pfeiltaste.
   * @type {boolean}
   */
  UP = false;

  /**
   * Status der unteren Pfeiltaste.
   * @type {boolean}
   */
  DOWN = false;

  /**
   * Status der Leertaste.
   * @type {boolean}
   */
  SPACE = false;

  /**
   * Status der "D"-Taste.
   * @type {boolean}
   */
  D = false;

  /**
   * Erzeugt eine Instanz der Keyboard-Klasse.
   */
  constructor() {
    this.pressedBtnEvents();
  }

  /**
   * Ereignisbehandlung für gedrückte Tasten.
   */
  pressedBtnEvents() {
    setInterval(() => {
      document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.LEFT = true;
      });
      document.getElementById("btnLeft").addEventListener("touchend", (e) => {
        e.preventDefault();
        this.LEFT = false;
      });

      document
        .getElementById("btnRight")
        .addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.RIGHT = true;
        });
      document.getElementById("btnRight").addEventListener("touchend", (e) => {
        e.preventDefault();
        this.RIGHT = false;
      });

      document.getElementById("btnJump").addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.SPACE = true;
      });
      document.getElementById("btnJump").addEventListener("touchend", (e) => {
        e.preventDefault();
        this.SPACE = false;
      });

      document
        .getElementById("btnThrow")
        .addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.D = true;
        });
      document.getElementById("btnThrow").addEventListener("touchend", (e) => {
        e.preventDefault();
        this.D = false;
      });
    }, 1000 / 60);
  }
}
