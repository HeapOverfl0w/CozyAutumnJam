class BuyCrafts {
    constructor(userData, client, homeCallback) {
        this.userData = userData;
        this.client = client;

        this.placeMode = false;

        this.homeCallback = homeCallback;

        this.lastSelectedCraft = undefined;

        this.visible = false;
        this.crafts = [];
        this.page = 0;
    }

    setVisible(isVisible) {
        this.visible = isVisible;

        if (this.visible) {
            this.setupMenuOptions();
            CHANGE_CANVAS_RESOLTUION(CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
            HIDE_CHAT_INPUT();
            HIDE_UNDO_BUTTON();
        }
    }

    setupMenuOptions() {
        let navBar = document.getElementById('navbar');

        while(navBar.firstChild) {
            navBar.removeChild(navBar.firstChild);
        }

        let button = document.createElement("button");
        let text = document.createTextNode("HOME");
        button.appendChild(text);
        button.id = "homeBtn";
        button.onclick = this.homeCallback;
        navBar.appendChild(button);

        HIDE_CRAFT_INFO();
        this.setupCraftsList();
    }

    setupPageMoveOptions() {
        let navBar = document.getElementById('navbar');

        if (this.page > 0) {
            let button = document.createElement("button");
            let text = document.createTextNode("PREVIOUS PAGE");
            button.appendChild(text);
            button.id = "previousBtn";
            button.onclick = this.previousPage.bind(this);
            navBar.appendChild(button);
        }

        if (this.crafts.length >= 20) {
            let button = document.createElement("button");
            let text = document.createTextNode("NEXT PAGE");
            button.appendChild(text);
            button.id = "nextBtn";
            button.onclick = this.nextPage.bind(this);
            navBar.appendChild(button);
        }
    }

    previousPage() {
        this.page--;
        this.setupMenuOptions();
    }

    nextPage() {
        this.page++;
        this.setupMenuOptions();
    }

    setupCraftsList() {
        let menulist = document.getElementById('menulist');
        //menulist.className = 'materialUl';

        while(menulist.firstChild) {
            menulist.removeChild(menulist.firstChild);
        }

        this.client.getCraftBuyList(this.page)
            .then(response => response.json())
            .then(crafts => {
                this.crafts = crafts;
                SET_IMAGES_ON_CRAFTS_LIST(crafts);
                for (let i = 0; i < crafts.length; i++) {
                    let node = document.createElement("LI");
                    node.className = "craftLi";
                    let textnode = document.createTextNode(crafts[i].name);
        
                    node.onclick = function() {
                        let selectedCrafts = document.getElementsByClassName("selectedCraftLi");
                        for (let i = 0; i < selectedCrafts.length; i++) {
                            selectedCrafts[i].className = "craftLi";
                        }
                        this.className = "selectedCraftLi";
                    }
                    
                    node.appendChild(textnode);
                    menulist.appendChild(node);
                }

                this.setupPageMoveOptions();
            });

    }

    setupCraftOptions(craft) {
        let navBar = document.getElementById('navbar');

        if (navBar.lastChild.id !== "buyBtn") {
            let button = document.createElement("button");
            let text = document.createTextNode("BUY");
            button.appendChild(text);
            button.id = "buyBtn";
            button.onclick = this.buy.bind(this);
            navBar.appendChild(button);            
        }

        if (this.lastSelectedCraft != craft) {
            SHOW_CRAFT_INFO(craft);
            this.lastSelectedCraft = craft;
        }
    }

    buy() {
        let selectedCraft = this.getSelectedCraft();
        if (selectedCraft && 
            selectedCraft.price <= this.userData.playerData.money &&
            this.userData.crafts.length <= 30 &&
            selectedCraft.owner !== this.userData.id) {
            this.client.buyCraft(selectedCraft)
                .then(response => { 
                    if (response.status === 401) {
                        vt.error("Craft was already purchased.");
                        this.crafts.splice(this.userData.crafts.indexOf(selectedCraft), 1);
                        this.setupMenuOptions();
                    } else {
                        response.json().then(craft => {
                            craft.image = TURN_BASE64_TO_IMAGE(craft.data);
                            this.userData.playerData.money -= selectedCraft.price;
                            this.userData.crafts.push(craft);
                            this.setupMenuOptions();
                            UPDATE_USER_INFO(this.userData);
                        });
                    }
                })                
        } else {
            if (selectedCraft.price > this.userData.playerData.money) {
                vt.error("Not enough money.");
            }
            if (selectedCraft.owner === this.userData.id) {
                vt.error("You already own that craft.");
            }
            if (this.userData.crafts.length >= 30) {
                vt.error("You own too many crafts.")
            }
        }
    }

    getSelectedCraft() {
        //get selected material
        let selectedCrafts = document.getElementsByClassName("selectedCraftLi");
        if (selectedCrafts.length > 0) {
            let selectedCraftIndex = -1;
            let menuList = selectedCrafts[0].parentElement.children;
            for (let i = 0; i < menuList.length; i++) {
                if (selectedCrafts[0] === menuList[i]) {
                    selectedCraftIndex = i;
                }
            }

            return selectedCraftIndex > -1 ? this.crafts[selectedCraftIndex] : undefined;
        }
        return undefined;
    }

    draw(ctx) {
        let selectedCraft = this.getSelectedCraft();
        ctx.drawImage(CRAFT_BACKDROP, 0, 0, CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);

        if(selectedCraft) {
            this.setupCraftOptions(selectedCraft);
            ctx.drawImage(selectedCraft.image, 0, 0);
        }
    }

}