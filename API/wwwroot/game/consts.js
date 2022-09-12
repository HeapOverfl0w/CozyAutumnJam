const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 260;
const CRAFT_CANVAS_WIDTH = CANVAS_WIDTH / 2;
const CRAFT_CANVAS_HEIGHT = CANVAS_HEIGHT / 2;
const BASE_URL = "http://localhost:5000";

//resources
const HOME_BACKDROP = document.getElementById('homebackdrop');
const CRAFT_BACKDROP = document.getElementById('craftbackdrop');

const MATERIAL_SPRITES = {};
MATERIAL_SPRITES['stick'] = document.getElementById('stick');

const CHANGE_CANVAS_RESOLTUION = function (width, height) {
    let canvas = document.getElementById('scene');
    let navbar = document.getElementById('navbar');
    canvas.width = width;
    canvas.height = height;

    let aspectRatio = canvas.width / canvas.height;
    width = window.innerWidth;
    if (window.innerWidth / aspectRatio > window.innerHeight) {
        width = (window.innerHeight - navbar.clientHeight) * aspectRatio;
    }
    canvas.style.width = width + "px";
    canvas.style.height = width / aspectRatio + "px";
}

const TURN_BASE64_TO_IMAGE = function (base64) {
    let image = new Image();
    image.src = base64;
    return image;
}

const SET_IMAGES_ON_USER_DATA = function (userData) {
    for(let i = 0; i < userData.crafts.length; i++) {
        userData.crafts[i].image = TURN_BASE64_TO_IMAGE(userData.crafts[i].data);
    }
}

const SET_IMAGES_ON_CRAFTS_LIST = function (crafts) {
    for(let i = 0; i < crafts.length; i++) {
        crafts[i].image = TURN_BASE64_TO_IMAGE(crafts[i].data);
    }
}