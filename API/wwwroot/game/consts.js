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
MATERIAL_SPRITES['redLeaf'] = document.getElementById('redLeaf');
MATERIAL_SPRITES['yellowLeaf'] = document.getElementById('yellowLeaf');
MATERIAL_SPRITES['orangeLeaf'] = document.getElementById('orangeLeaf');

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

const HIDE_CHAT_INPUT = function () {
    let chatInput = document.getElementById("chatbox");
    chatInput.style.display = "none";
}