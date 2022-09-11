class Main {
    constructor(userData, identity, logoutCallback) {
        this.userData = userData;
        this.identity = identity;

        this.changeUserData();

        this.client = new Client(identity);

        this.home = new Home(userData, this.client, logoutCallback, 
            this.craftsCallback.bind(this), this.buyCallback.bind(this), this.createCraftCallback.bind(this));
        this.createCraft = new CreateCraft(userData, this.client, this.homeCallback.bind(this));
        this.home.setVisible(true);
        this.activePage = this.home;
    }

    changeUserData() {
        this.userData.playerData.lastWoodsSearch = new Date(this.userData.playerData.lastWoodsSearch);
    }

    craftsCallback() {
        this.home.setVisible(false);
        this.crafts.setVisible(true);
        this.buy.setVisible(false);
        this.createCraft.setVisible(false);
        this.activePage = this.crafts;
    }

    buyCallback() {
        this.home.setVisible(false);
        this.crafts.setVisible(false);
        this.buy.setVisible(true);
        this.createCraft.setVisible(false);
        this.activePage = this.buy;
    }

    homeCallback() {
        this.home.setVisible(true);
        this.crafts.setVisible(false);
        this.buy.setVisible(false);
        this.createCraft.setVisible(false);
        this.activePage = this.home;
    }

    createCraftCallback() {
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
        this.activePage.draw(ctx);
    }
}