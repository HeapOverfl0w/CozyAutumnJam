class Main {
    constructor(userData, identity, logoutCallback) {
        this.userData = userData;
        this.identity = identity;

        this.client = new Client(identity);

        this.home = new Home(userData, this.client, logoutCallback, 
            this.craftsCallback.bind(this), this.buyCallback.bind(this), this.createCraftCallback.bind(this));
        this.createCraft = new CreateCraft(userData, this.client, this.homeCallback.bind(this), this.craftsCallback.bind(this));
        this.home.setVisible(true);
        this.crafts = new Crafts(userData, this.client, this.homeCallback.bind(this));
        this.buy = new BuyCrafts(userData, this.client, this.homeCallback.bind(this));
        this.activePage = this.home;
    }

    craftsCallback() {
        AUDIO_HANDLER.playClick();
        this.home.setVisible(false);
        this.crafts.setVisible(true);
        this.buy.setVisible(false);
        this.createCraft.setVisible(false);
        this.activePage = this.crafts;
    }

    buyCallback() {
        AUDIO_HANDLER.playClick();
        this.home.setVisible(false);
        this.crafts.setVisible(false);
        this.buy.setVisible(true);
        this.createCraft.setVisible(false);
        this.activePage = this.buy;
    }

    homeCallback() {
        AUDIO_HANDLER.playClick();
        this.home.setVisible(true);
        this.crafts.setVisible(false);
        this.buy.setVisible(false);
        this.createCraft.setVisible(false);
        this.activePage = this.home;
    }

    placeCraftCallback() {
        AUDIO_HANDLER.playClick();
        this.home.setVisible(true);
        this.crafts.setVisible(false);
        this.buy.setVisible(false);
        this.createCraft.setVisible(false);
        this.activePage = this.home;
    }

    createCraftCallback() {
        AUDIO_HANDLER.playClick();
        this.home.setVisible(false);
        this.crafts.setVisible(false);
        this.buy.setVisible(false);
        this.createCraft.setVisible(true);
        this.activePage = this.createCraft;
    }

    onKeyUp(keyCode) {
        if (this.activePage.onKeyUp) {
            this.activePage.onKeyUp(keyCode);
        }
    }

    onKeyDown(keyCode) {
        if (this.activePage.onKeyDown) {
            this.activePage.onKeyDown(keyCode);
        }
    }

    onMouseOver(mouseLocation) {
        if (this.activePage.onMouseOver) {
            this.activePage.onMouseOver(mouseLocation);
        }
    }

    onMouseClick(mouseLocation) {
        if (this.activePage.onMouseClick) {
            this.activePage.onMouseClick(mouseLocation);
        }
    }

    draw(ctx) {
        if (AUDIO_HANDLER) {
            AUDIO_HANDLER.update();
        }
        this.activePage.draw(ctx);
    }
}