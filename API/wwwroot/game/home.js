class Home {
    constructor(userData, client, logoutCallback, craftsCallback, buyCallback) {
        this.userData = userData;
        this.visible = false;
        this.logoutCallback = logoutCallback;
        this.craftsCallback = craftsCallback;
        this.buyCallback = buyCallback;
        this.client = client;

        this.searchWoodsTimer = undefined;
        this.setupSearchWoodsTimeout();

        this.chatTimer = undefined;
        this.lastReceivedMessage = '';
        this.setupChatTimeout();
    }

    setupChatTimeout() {
        this.client.sendChat(this.userData.userName + " joined the chat!");
        this.chatTimer = window.setInterval()
    }

    chatTimeout() {
        if (this.visible) {
            this.client.retrieveChat(this.lastReceivedMessage)
            .then(response => response.json())
            .then(texts => {
                for (let t = 0; t < texts.length; t++) {
                    this.addMessage(texts[t]);
                }
            })
        }
    }

    addMessage(text) {
        //TODO
        this.lastReceivedMessage = text;
    }

    disconnectFromChat() {
        if (this.chatTimer) {
            window.clearInterval(this.chatTimer);
        }
    }

    setVisible(isVisible) {
        this.visible = isVisible;

        if (this.visible) {
            this.setMenuOptions();
            CHANGE_CANVAS_RESOLTUION(CANVAS_WIDTH, CANVAS_HEIGHT);
        }
    }

    setMenuOptions() {
        let navBar = document.getElementById('navbar');

        let button = document.createElement("button");
        let text = document.createTextNode("LOGOUT");
        button.appendChild(text);
        button.id = "logoutBtn";
        button.onclick = this.logoutCallback;
        navBar.appendChild(button);

        button = document.createElement("button");
        text = document.createTextNode("CRAFTS");
        button.appendChild(text);
        button.id = "craftsBtn";
        button.onclick = this.craftsCallback;
        navBar.appendChild(button);

        button = document.createElement("button");
        text = document.createTextNode("BUY CRAFTS");
        button.appendChild(text);
        button.id = "buyBtn";
        button.onclick = this.buyCallback;
        navBar.appendChild(button);

        button = document.createElement("button");
        text = document.createTextNode("SEARCH WOODS");
        button.appendChild(text);
        button.id = "searchWoodsBtn";
        button.onclick = this.searchWoodsCallback.bind(this);
        navBar.appendChild(button);
    }

    searchWoodsCallback() {
        if (!this.userData.playerData.isSearchingWoods) {
            this.client.searchWoods()
            .then(() => {
                this.userData.playerData.isSearchingWoods = true;
                this.userData.playerData.lastWoodsSearch = Date.now();
                this.setupSearchWoodsTimeout();
            });
        }        
    }

    setupSearchWoodsTimeout() {
        if (this.userData.playerData.isSearchingWoods) {
            this.searchWoodsTimer = window.setTimeout(this.searchWoodsTimeout.bind(this), 
                Date.now() - this.userData.playerData.lastWoodsSearch + 20000)
        }
        
    }

    searchWoodsTimeout() {
        this.client.getPlayerData()
        .then(response => response.json())
        .then(userData => {
            this.userData = userData;
        });
    }

    draw(ctx) {
        if (visible) {
            //draw backdrop
            ctx.drawImage(HOME_BACKDROP, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            for (let i = 0; i < this.userData.crafts; i++) {
                let craft = this.userData.crafts[i];
                if (craft.placedX > -1 && craft.placedY > -1) {
                    //TODO
                    //ctx.drawImage()
                }
            }
        }
    }
}