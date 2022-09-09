const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 260;
const CRAFT_CANVAS_WIDTH = CANVAS_WIDTH / 2;
const CRAFT_CANVAS_HEIGHT = CANVAS_HEIGHT / 2;
const BASE_URL = "http://localhost:5000";

//resources
const HOME_BACKDROP = document.getElementById('homebackdrop');

const CRAFT_SPRITE_LOCATIONS = {};
const CRAFT_SPRITE_SIZES = {};

const CHANGE_CANVAS_RESOLTUION = function (width, height) {
    let canvas = document.getElementById('scene');
    canvas.width = width;
    canvas.height = height;

    let aspectRatio = canvas.width / canvas.height;
    let width = window.innerWidth;
    if (window.innerWidth / aspectRatio > window.innerHeight) {
    width = window.innerHeight * aspectRatio;
    }
    canvas.style.width = width + "px";
    canvas.style.height = width / aspectRatio + "px";
}