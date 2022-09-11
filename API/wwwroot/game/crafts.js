class Crafts {
    constructor(userData, client) {
        this.userData = userData;
        this.client = client;

        this.visible = false;
    }

    setVisible(isVisible) {
        this.visible = isVisible;

        if (this.visible) {
            this.setMenuOptions();
            CHANGE_CANVAS_RESOLTUION(CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
        }
    }

    setupMenuOptions() {

    }

    draw() {

    }
}