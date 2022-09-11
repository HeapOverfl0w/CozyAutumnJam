class Home {
    constructor(userData, client, logoutCallback, craftsCallback, buyCallback, createCraftCallback) {
        this.userData = userData;
        this.visible = false;
        this.logoutCallback = logoutCallback;
        this.craftsCallback = craftsCallback;
        this.buyCallback = buyCallback;
        this.createCraftCallback = createCraftCallback;
        this.client = client;

        this.searchWoodsTimer = undefined;

        this.chatTimer = undefined;
        this.lastReceivedMessage = '';
        this.setupChatTimeout();
    }

    setupChatTimeout() {
        this.client.sendChat(this.userData.userName + " joined the chat!");
        this.chatTimer = window.setInterval(this.chatTimeout.bind(this), 5000);
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

    addMessage(text, color = "#FFFFFF") {
        this.lastReceivedMessage = text;

        var node = document.createElement("LI");
        node.className = "chatLi";
        var textnode = document.createTextNode(text);
        node.appendChild(textnode);

        var discussion = document.getElementById("menulist");
        if (discussion.children.length > 60)
            discussion.removeChild(discussion.firstChild);
        discussion.appendChild(node);
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
            if (!this.searchWoodsTimer) {
                this.setupSearchWoodsTimeout();
            }

            CHANGE_CANVAS_RESOLTUION(CANVAS_WIDTH, CANVAS_HEIGHT);
        }
    }

    setMenuOptions() {
        let navBar = document.getElementById('navbar');

        while(navBar.firstChild) {
            navBar.removeChild(navBar.firstChild);
        }

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
        text = document.createTextNode("CREATE CRAFT");
        button.appendChild(text);
        button.id = "createCraftBtn";
        button.onclick = this.createCraft;
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

        let sidepanel = document.getElementById("sidepanel");
        sidepanel.className = "discussion";
    }

    searchWoodsCallback() {
        if (!this.userData.playerData.isSearchingWoods) {
            if (this.calculateMaterialCount() >= 300) {
                this.client.searchWoods()
                .then(() => {
                    this.userData.playerData.isSearchingWoods = true;
                    this.userData.playerData.lastWoodsSearch = Date.now();
                    this.setupSearchWoodsTimeout();
                });
            } else {
                this.addMessage("!!! You have too many materials (over 300). Create a craft before searching for more. !!!", "#FF0000");
            }
        }        
    }

    calculateMaterialCount() {
        let returnValue = 0;
        for (const [key, value] of Object.entries(this.userData.playerData.materials)) {
            returnValue += value;
        }
        return returnValue;
    }

    createCraft() {
        if (this.userData.crafts.length <= 30) {
            this.createCraftCallback();
        } else {
            this.addMessage("!!! You have too many crafts (30). Delete crafts in order to create more. !!!", "#FF0000");
        }
    }

    setupSearchWoodsTimeout() {
        if (this.userData.playerData.isSearchingWoods) {
            this.searchWoodsTimer = window.setTimeout(this.searchWoodsTimeout.bind(this), 
            this.userData.playerData.lastWoodsSearch - Date.now()  + 620000);

            let button = document.getElementById("searchWoodsBtn");
            let text = document.createTextNode("SEARCHING WOODS...");
            button.removeChild(button.firstChild);
            button.appendChild(text);
        }
        
    }

    searchWoodsTimeout() {
        this.client.getPlayerData()
        .then(response => response.json())
        .then(userData => {
            this.userData = userData;
            this.searchWoodsTimer = undefined;

            let button = document.getElementById("searchWoodsBtn");
            let text = document.createTextNode("SEARCH WOODS");
            button.removeChild(button.firstChild);
            button.appendChild(text);
        });
    }

    draw(ctx) {
        if (this.visible) {
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