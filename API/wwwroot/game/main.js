class Main {
    constructor(userData, identity, logoutCallback) {
        this.userData = userData;
        this.identity = identity;

        this.client = new Client(identity);

        this.home = new Home(userData, this.client, logoutCallback, this.craftsCallback.bind(this), this.buyCallback.bind(this));
        this.activePage = this.home;
    }

    craftsCallback() {

    }

    buyCallback() {

    }

    draw(ctx) {
        this.activePage.draw(ctx);
    }
}