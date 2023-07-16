let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My character is", world.character);
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 37) keyboard.LEFT = true;

  if (event.keyCode == 39) keyboard.RIGHT = true;

  if (event.keyCode == 38) keyboard.UP = true;

  if (event.keyCode == 40) keyboard.DOWN = true;

  if (event.keyCode == 32) keyboard.SPACE = true;

  if (event.keyCode == 68) keyboard.D = true;
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode == 37) keyboard.LEFT = false;

  if (event.keyCode == 39) keyboard.RIGHT = false;

  if (event.keyCode == 38) keyboard.UP = false;

  if (event.keyCode == 40) keyboard.DOWN = false;

  if (event.keyCode == 32) keyboard.SPACE = false;

  if (event.keyCode == 68) keyboard.D = false;
});

function restart(id) {
  let content = document.getElementById(id);
  content.classList.add("d-none");
  document.getElementById("startscreen").classList.remove("d-none");
}

function openSettings() {
  let btn = document.getElementById("settingsBtn");
  btn.setAttribute("onclick", "closeSettings()");
  btn.src = "img/icon/settings.png";
  document.getElementById("settings").classList.remove("d-none");
}

function closeSettings() {
  let btn = document.getElementById("settingsBtn");
  btn.setAttribute("onclick", "openSettings()");
  btn.src = "img/icon/settings.png";
  document.getElementById("settings").classList.add("d-none");
}
