const CANVAS_WIDTH = 450;
const CANVAS_HEIGHT = 390;
const CRAFT_CANVAS_WIDTH = CANVAS_WIDTH / 3;
const CRAFT_CANVAS_HEIGHT = CANVAS_HEIGHT / 3;
const BASE_URL = "http://localhost:5000";

//resources
var AUDIO_HANDLER = undefined;

window.onload = function () {
    AUDIO_HANDLER = new AudioHandler();
    AUDIO_HANDLER.startup();
    let muteButton = document.getElementById("muteButton");
    muteButton.onclick = () => {
        AUDIO_HANDLER.toggleMute();
    };
}

const HOME_BACKDROP = document.getElementById('homebackdrop');
const HOME_BACKDROP1 = document.getElementById('homebackdrop1');
const HOME_BACKDROP2 = document.getElementById('homebackdrop2');
const CRAFT_BACKDROP = document.getElementById('craftbackdrop');

const MATERIAL_SPRITES = {};
MATERIAL_SPRITES['stick'] = document.getElementById('stick');
MATERIAL_SPRITES['redLeaf'] = document.getElementById('redLeaf');
MATERIAL_SPRITES['yellowLeaf'] = document.getElementById('yellowLeaf');
MATERIAL_SPRITES['orangeLeaf'] = document.getElementById('orangeLeaf');
MATERIAL_SPRITES['blackPaintStripe'] = document.getElementById('blackPaintStripe');
MATERIAL_SPRITES['whitePaintStripe'] = document.getElementById('whitePaintStripe');
MATERIAL_SPRITES['whitePaintCircle'] = document.getElementById('whitePaintCircle');
MATERIAL_SPRITES['blackPaintCircle'] = document.getElementById('blackPaintCircle');
MATERIAL_SPRITES['corn'] = document.getElementById('corn');
MATERIAL_SPRITES['feather'] = document.getElementById('feather');
MATERIAL_SPRITES['pineCone'] = document.getElementById('pineCone');
MATERIAL_SPRITES['woodBoard'] = document.getElementById('woodBoard');
MATERIAL_SPRITES['bone'] = document.getElementById('bone');
MATERIAL_SPRITES['skull'] = document.getElementById('skull');
MATERIAL_SPRITES['candle'] = document.getElementById('candle');
MATERIAL_SPRITES['bottle'] = document.getElementById('bottle');
MATERIAL_SPRITES['pumpkin'] = document.getElementById('pumpkin');
MATERIAL_SPRITES['googlyEyes'] = document.getElementById('googlyEyes');
MATERIAL_SPRITES['straw'] = document.getElementById('straw');
MATERIAL_SPRITES['scarf'] = document.getElementById('scarf');
MATERIAL_SPRITES['rope'] = document.getElementById('rope');
MATERIAL_SPRITES['tire'] = document.getElementById('tire');
MATERIAL_SPRITES['sheet'] = document.getElementById('sheet');
MATERIAL_SPRITES['witchHat'] = document.getElementById('witchHat');
MATERIAL_SPRITES['metal'] = document.getElementById('metal');
MATERIAL_SPRITES['hoodie'] = document.getElementById('hoodie');
MATERIAL_SPRITES['broom'] = document.getElementById('broom');
MATERIAL_SPRITES['pitchFork'] = document.getElementById('pitchFork');
MATERIAL_SPRITES['pumpkinPie'] = document.getElementById('pumpkinPie');
MATERIAL_SPRITES['rock'] = document.getElementById('rock');
MATERIAL_SPRITES['chair'] = document.getElementById('chair');
MATERIAL_SPRITES['overalls'] = document.getElementById('overalls');
MATERIAL_SPRITES['sword'] = document.getElementById('sword');
MATERIAL_SPRITES['blackPaintTriangle'] = document.getElementById('blackPaintTriangle');
MATERIAL_SPRITES['whitePaintTriangle'] = document.getElementById('whitePaintTriangle');
MATERIAL_SPRITES['cinderBlock'] = document.getElementById('cinderBlock');
MATERIAL_SPRITES['metalPipe'] = document.getElementById('metalPipe');
MATERIAL_SPRITES['bark'] = document.getElementById('bark');
MATERIAL_SPRITES['beerCan'] = document.getElementById('beerCan');

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

const SHOW_CRAFT_INFO = function (craft) {
    let craftInfo = document.getElementById("craftinfo");
    craftInfo.innerHTML = `<p>Name : ${craft.name}<br/>Creator : ${craft.creator}<br/>Price : ${craft.price}</p>`;
    craftInfo.style.display = "block";
}

const SHOW_CREATE_CRAFT_INFO = function () {
    let craftInfo = document.getElementById("craftinfo");
    craftInfo.innerHTML = '<p>Hold E/R to rotate.<br/>Press F to flip horizontally.<br/>Left click to place.</p>';
    craftInfo.style.display = "block";
}

const HIDE_CRAFT_INFO = function () {
    let craftInfo = document.getElementById("craftinfo");
    craftInfo.style.display = "none";
}

const UPDATE_USER_INFO = function (userData) {
    let userInfo = document.getElementById("userinfo");
    userInfo.innerHTML = `${userData.userName} - $${userData.playerData.money}`
}

const SHOW_CHAT_INPUT = function () {
    let chatInput = document.getElementById("chatbox");
    chatInput.style.display = "block";
}

const SHOW_UNDO_BUTTON = function () {
    let undoButton = document.getElementById("undo");
    undoButton.style.display = "block";
}

const HIDE_UNDO_BUTTON = function () {
    let undoButton = document.getElementById("undo");
    undoButton.style.display = "none";
}

const HIDE_CHAT_INPUT = function () {
    let chatInput = document.getElementById("chatbox");
    chatInput.style.display = "none";
}