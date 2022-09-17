class Home {
    constructor(userData, client, logoutCallback, craftsCallback, buyCallback, createCraftCallback) {
        this.userData = userData;
        this.changeUserData();

        this.visible = false;
        this.logoutCallback = logoutCallback;
        this.craftsCallback = craftsCallback;
        this.buyCallback = buyCallback;
        this.createCraftCallback = createCraftCallback;
        this.client = client;

        this.searchWoodsTimer = undefined;

        this.chatTimer = undefined;
        this.selectedInviteCrafts = undefined;
        this.lastSelectedInvite = undefined;
        this.lastReceivedMessage = '';
        this.setupChatTimeout();
    }

    changeUserData() {
        SET_IMAGES_ON_USER_DATA(this.userData);
        this.userData.playerData.lastWoodsSearch = new Date(this.userData.playerData.lastWoodsSearch);
    }

    setupChatTimeout() {
        if (!this.chatTimer) {
            this.client.sendChat(this.userData.userName + " joined the chat!");
            this.chatTimer = window.setInterval(this.chatTimeout.bind(this), 6000);
        }
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
        this.lastReceivedMessage = text;

        var node = document.createElement("LI");
        node.className = text.startsWith("*") ? "inviteLi" : "chatLi";
        var textnode = document.createTextNode(text);
        node.appendChild(textnode);

        if (text.startsWith("*")) {
            node.onclick = function () {
                this.className = "selectedInviteLi";
            }
        }

        var discussion = document.getElementById("menulist");
        if (discussion.children.length > 60)
            discussion.removeChild(discussion.firstChild);
        discussion.appendChild(node);

        discussion.scrollTop = menulist.scrollHeight;
    }

    disconnectFromChat() {
        if (this.chatTimer) {
            window.clearInterval(this.chatTimer);
            this.chatTimer = undefined;
        }
    }

    setVisible(isVisible) {
        this.visible = isVisible;

        if (this.visible) {
            this.lastReceivedMessage = '';
            this.setupMenuOptions();
            
            this.setupSearchWoodsTimeout();
            SHOW_CHAT_INPUT();
            HIDE_UNDO_BUTTON();

            CHANGE_CANVAS_RESOLTUION(CANVAS_WIDTH, CANVAS_HEIGHT);
        }
    }

    setupMenuOptions(clearChat = true) {
        let navBar = document.getElementById('navbar');

        while(navBar.firstChild) {
            navBar.removeChild(navBar.firstChild);
        }

        if (clearChat) {
            let menulist = document.getElementById('menulist');

            while(menulist.firstChild) {
                menulist.removeChild(menulist.firstChild);
            }
        }

        if (!this.selectedInviteCrafts) {
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
            button.onclick = this.createCraft.bind(this);
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

            HIDE_CRAFT_INFO();
            UPDATE_USER_INFO(this.userData);
        } else {
            let button = document.createElement("button");
            let text = document.createTextNode("HOME");
            button.appendChild(text);
            button.id = "homeBtn";
            button.onclick = this.deselectInvites.bind(this);
            navBar.appendChild(button);
        }
    }

    searchWoodsCallback() {
        if (!this.userData.playerData.isSearchingWoods) {
            if (this.calculateMaterialCount() <= 500) {
                this.client.searchWoods()
                .then(() => {
                    this.userData.playerData.isSearchingWoods = true;
                    this.userData.playerData.lastWoodsSearch = Date.now();
                    this.setupSearchWoodsTimeout();
                });
            } else {
                vt.error("You have too many materials (over 500). Create a craft before searching for more.");
            }
        }        
    }

    calculateMaterialCount() {
        let returnValue = 0;
        for (const [key, value] of Object.entries(this.userData.playerData.materials)) {
            if (key !== "id") {
                returnValue += value;
            }
        }
        return returnValue;
    }

    createCraft() {
        if (this.userData.crafts.length <= 30) {
            this.createCraftCallback();
        } else {
            vt.error("You have too many crafts (30). Delete crafts in order to create more.");
        }
    }

    setupSearchWoodsTimeout() {
        if (this.userData.playerData.isSearchingWoods) {
            if (this.searchWoodsTimer) {
                window.clearTimeout(this.searchWoodsTimer);
            }
            this.searchWoodsTimer = window.setTimeout(this.searchWoodsTimeout.bind(this), 
            this.userData.playerData.lastWoodsSearch - Date.now()  + 320000);

            this.changeSearchWoodsButton();
        }
    }

    changeSearchWoodsButton() {
        if (this.userData.playerData.isSearchingWoods) {
            let button = document.getElementById("searchWoodsBtn");
            button.className = "searchingWoodsButton";
            let text = document.createTextNode("SEARCHING WOODS...");
            button.removeChild(button.firstChild);
            button.appendChild(text);
        }
    }

    searchWoodsTimeout() {
        this.client.getPlayerData()
        .then(response => response.json())
        .then(userData => {
            this.userData.playerData.money = userData.playerData.money;
            this.userData.playerData.materials = userData.playerData.materials;
            this.userData.playerData.isSearchingWoods = false;

            UPDATE_USER_INFO(this.userData);

            this.searchWoodsTimer = undefined;

            let button = document.getElementById("searchWoodsBtn");
            if (button) {
                let text = document.createTextNode("SEARCH WOODS");
                button.className = "";
                button.removeChild(button.firstChild);
                button.appendChild(text);
            }
            

            vt.success("Completed searching the woods!");
        });
    }

    onKeyUp(keyCode) {
        if (keyCode == 13)
        {
            let input = document.getElementById("chatbox");
            let textInput = input.value;
            if (textInput) {
                if (textInput.toUpperCase() === "/INVITE") {
                    this.client.sendChat(`* ${this.userData.userName} invites everyone to see their home. *`);
                } else {
                    this.client.sendChat(this.userData.userName + " : " + textInput);
                } 
                input.value = "";               
            }
        }   
    }

    getSelectedInvite() {
        //get selected material
        let selectedInvites = document.getElementsByClassName("selectedInviteLi");
        if (selectedInvites.length > 0) {
            let userToVisit = selectedInvites[0].firstChild.nodeValue.split(" ")[1];

            return userToVisit;
        }
        return undefined;
    }

    deselectInvites() {
        let selectedInvites = document.getElementsByClassName("selectedInviteLi");
        for(let i = 0; i < selectedInvites.length; i++) {
            selectedInvites[i].className = "inviteLi";
        }

        this.selectedInviteCrafts = undefined;
        this.lastSelectedInvite = undefined;
        this.setupMenuOptions(false);
        this.changeSearchWoodsButton();
    }

    draw(ctx) {
        if (this.visible) {
            if (this.selectedInviteCrafts) {
                //draw backdrop
                ctx.drawImage(HOME_BACKDROP, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

                for (let i = 0; i < this.selectedInviteCrafts.length; i++) {
                    let craft = this.selectedInviteCrafts[i];
                    if (craft.placedX > -5000 && craft.placedY > -5000) {
                        ctx.drawImage(craft.image, craft.placedX, craft.placedY);
                    }
                }
            } else {
                let selectedInvite = this.getSelectedInvite();

                if (!selectedInvite) {
                    //draw backdrop
                    ctx.drawImage(HOME_BACKDROP, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

                    for (let i = 0; i < this.userData.crafts.length; i++) {
                        let craft = this.userData.crafts[i];
                        if (craft.placedX > -5000 && craft.placedY > -5000) {
                            ctx.drawImage(craft.image, craft.placedX, craft.placedY);
                        }
                    }
                } else if (this.lastSelectedInvite != selectedInvite) {
                    this.lastSelectedInvite = selectedInvite;
                    this.client.getPlayerData(selectedInvite)
                    .then(response => response.json())
                    .then((data) => {
                        SET_IMAGES_ON_USER_DATA(data);
                        this.selectedInviteCrafts = data.crafts;
                        this.setupMenuOptions(false);
                    })
                }
            }
        }
    }
}