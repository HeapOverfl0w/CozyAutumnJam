class Crafts {
    constructor(userData, client, homeCallback) {
        this.userData = userData;
        this.client = client;

        this.placeMode = false;

        this.homeCallback = homeCallback;

        this.visible = false;
        this.lastSelectedCraft = undefined;
    }

    setVisible(isVisible) {
        this.visible = isVisible;

        if (this.visible) {
            this.setupMenuOptions();
            this.setupModal();
            CHANGE_CANVAS_RESOLTUION(CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
            HIDE_CHAT_INPUT();
            HIDE_UNDO_BUTTON();
        }
    }

    setupMenuOptions(craft = undefined) {
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

        this.lastSelectedCraft = undefined;
        HIDE_CRAFT_INFO();
        this.setupCraftsList(craft);
    }

    setupCraftOptions(craft) {
        let navBar = document.getElementById('navbar');

        if (this.lastSelectedCraft != craft) {
            while(navBar.firstChild != navBar.lastChild) {
                navBar.removeChild(navBar.lastChild);
            }
            let button = document.createElement("button");
            let text = document.createTextNode( craft.isForSale ? "CHANGE PRICE" : "SELL");
            button.appendChild(text);
            button.id = "sellBtn";
            button.onclick = this.openModal.bind(this);
            navBar.appendChild(button);

            if (craft.isForSale) {
                button = document.createElement("button");
                text = document.createTextNode("REMOVE FROM SALE");
                button.appendChild(text);
                button.id = "delistBtn";
                button.onclick = this.delistCraft.bind(this);
                navBar.appendChild(button);
            }

            if (craft.placedX > -5000 && craft.placedY > -5000) {
                button = document.createElement("button");
                text = document.createTextNode("REMOVE FROM HOME");
                button.appendChild(text);
                button.id = "removeBtn";
                button.onclick = this.removeCraft.bind(this);
                navBar.appendChild(button);
            }

            button = document.createElement("button");
            text = document.createTextNode("PLACE");
            button.appendChild(text);
            button.id = "placeBtn";
            button.onclick = this.placeCraft.bind(this);
            navBar.appendChild(button);

            button = document.createElement("button");
            text = document.createTextNode("DELETE");
            button.appendChild(text);
            button.id = "deleteBtn";
            button.onclick = this.deleteCraft.bind(this);
            navBar.appendChild(button);

            SHOW_CRAFT_INFO(craft);
            this.lastSelectedCraft = craft;
        }
    }

    openModal() {
        let modal = document.getElementById("modal");
        modal.style.display = "block";
    }

    closeModal() {
        let modal = document.getElementById("modal");
        modal.style.display = "none";
    }

    setupModal() {
        let button = document.getElementById("okButton");
        button.onclick = this.sellCraft.bind(this);
        let modalContents = document.getElementsByClassName("modal-sub-content");

        for (let i = 0; i < modalContents.length; i++) {
            modalContents[i].style.display = "none";
        }            

        let priceInput = document.getElementById("price-input");
        priceInput.style.display = "block";
        document.getElementById("price").value = 10;
    }

    onMouseOver(mouseLocation) {
        this.currentCanvasMouseLocation = new Vector2D(Math.floor(mouseLocation.x), Math.floor(mouseLocation.y));
    }

    onMouseClick(mouseLocation) {
        if (this.placeMode) {
            this.placeMode = false;
            let selectedCraft = this.getSelectedCraft();
            if (selectedCraft) {
                selectedCraft.placedX = -5000;
                selectedCraft.placedY = -5000;
                
                this.client.placeCraft(selectedCraft, 
                    Math.floor(mouseLocation.x - CRAFT_CANVAS_WIDTH/2), 
                    Math.floor(mouseLocation.y - CRAFT_CANVAS_HEIGHT/2))
                    .then((response) => {
                        if (response.status === 401) {
                            vt.error("You no longer own that craft.");
                            this.userData.crafts.splice(this.userData.crafts.indexOf(selectedCraft), 1);
                            this.setupMenuOptions();
                            //Item probably sold, update money count
                            this.client.getMoney().then(response => 
                                response.json().then((moneyDto) => {
                                    this.userData.playerData.money = moneyDto.money;
                                    UPDATE_USER_INFO(this.userData);
                                }));
                        } else {
                            selectedCraft.placedX = Math.floor(mouseLocation.x - CRAFT_CANVAS_WIDTH/2);
                            selectedCraft.placedY = Math.floor(mouseLocation.y - CRAFT_CANVAS_HEIGHT/2);

                            CHANGE_CANVAS_RESOLTUION(CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
                            this.setupMenuOptions(selectedCraft);
                            this.setupCraftOptions(selectedCraft);
                        }
                    })
            }
        }        
    }

    placeCraft() {
        let selectedCraft = this.getSelectedCraft();
        if (selectedCraft) {
            this.placeMode = true;

            let navBar = document.getElementById('navbar');

            while(navBar.firstChild) {
                navBar.removeChild(navBar.firstChild);
            }

            this.setupCraftsList(selectedCraft, false);

            CHANGE_CANVAS_RESOLTUION(CANVAS_WIDTH, CANVAS_HEIGHT);
            selectedCraft.placedX = -5000;
            selectedCraft.placedY = -5000;
        }
        
    }

    removeCraft() {
        let selectedCraft = this.getSelectedCraft();
        if (selectedCraft) {
            this.client.placeCraft(selectedCraft, -5000, -5000)
                .then((response) => {
                    //unauthorized since no longer owned
                    if (response.status === 401) {
                        vt.error("You no longer own that craft.");
                        this.userData.crafts.splice(this.userData.crafts.indexOf(selectedCraft), 1);
                        this.setupMenuOptions();
                        //Item probably sold, update money count
                        this.client.getMoney().then(response => 
                            response.json().then((moneyDto) => {
                                this.userData.playerData.money = moneyDto.money;
                                UPDATE_USER_INFO(this.userData);
                            }));
                    } else {
                        selectedCraft.placedX = -5000;
                        selectedCraft.placedY = -5000;
                        this.setupMenuOptions(selectedCraft);
                        this.setupCraftOptions(selectedCraft);
                    }
                });
        }
    }

    delistCraft() {
        let selectedCraft = this.getSelectedCraft();
        if (selectedCraft) {
            this.client.toggleCraftForSale(selectedCraft)
                .then((response) => {
                    //unauthorized since no longer owned
                    if (response.status === 401) {
                        vt.error("You no longer own that craft.");
                        this.userData.crafts.splice(this.userData.crafts.indexOf(selectedCraft), 1);
                        this.setupMenuOptions();
                        //Item probably sold, update money count
                        this.client.getMoney().then(response => 
                            response.json().then((moneyDto) => {
                                this.userData.playerData.money = moneyDto.money;
                                UPDATE_USER_INFO(this.userData);
                            }));
                    } else {
                        selectedCraft.isForSale = false;
                        selectedCraft.price = 0;
                        this.setupMenuOptions(selectedCraft);
                        this.setupCraftOptions(selectedCraft);
                    }
                });
        }
    }

    sellCraft() {
        let selectedCraft = this.getSelectedCraft();
        let price = Number.parseFloat(document.getElementById("price").value);
        if (price < 1 || !Number.isInteger(price)) {
            vt.error("Price must be greater than 1 and an integer.");
            return;
        }
        if (selectedCraft) {
            this.client.toggleCraftForSale(selectedCraft, price)
                .then((response) => {
                    //unauthorized since no longer owned
                    if (response.status === 401) {
                        vt.error("You no longer own that craft.");
                        this.userData.crafts.splice(this.userData.crafts.indexOf(selectedCraft), 1);
                        this.setupMenuOptions();
                        //Item probably sold, update money count
                        this.client.getMoney().then(response => 
                            response.json().then((moneyDto) => {
                                this.userData.playerData.money = moneyDto.money;
                                UPDATE_USER_INFO(this.userData);
                            }));
                    } else {
                        selectedCraft.isForSale = true;
                        selectedCraft.price = price;
                        this.closeModal();
                        this.setupMenuOptions(selectedCraft);
                        this.setupCraftOptions(selectedCraft);
                    }
                });
        }
    }

    deleteCraft() {
        let selectedCraft = this.getSelectedCraft();
        if (selectedCraft) {
            this.client.deleteCraft(selectedCraft)
                .then((response) => {
                    if (response.status === 401) {
                        vt.error("You no longer own that craft.");
                        this.userData.crafts.splice(this.userData.crafts.indexOf(selectedCraft), 1);
                        this.setupMenuOptions();
                        //Item probably sold, update money count
                        this.client.getMoney().then(response => 
                            response.json().then((moneyDto) => {
                                this.userData.playerData.money = moneyDto.money;
                                UPDATE_USER_INFO(this.userData);
                            }));
                    } else {
                        this.userData.crafts.splice(this.userData.crafts.indexOf(selectedCraft), 1);
                        this.setupMenuOptions();
                    }
                })
        }
    }

    setupCraftsList(craft = undefined, allowClick = true) {
        let menulist = document.getElementById('menulist');
        //menulist.className = 'materialUl';

        while(menulist.firstChild) {
            menulist.removeChild(menulist.firstChild);
        }

        for (let i = 0; i < this.userData.crafts.length; i++) {
            let node = document.createElement("LI");
            node.className = craft === this.userData.crafts[i] ? "selectedCraftLi" : "craftLi";
            let textnode = document.createTextNode(this.userData.crafts[i].name);

            if (allowClick) {
                node.onclick = function() {
                    let selectedCrafts = document.getElementsByClassName("selectedCraftLi");
                    for (let i = 0; i < selectedCrafts.length; i++) {
                        selectedCrafts[i].className = "craftLi";
                    }
                    this.className = "selectedCraftLi";
                }
            }
            
            node.appendChild(textnode);
            menulist.appendChild(node);
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

            return selectedCraftIndex > -1 ? this.userData.crafts[selectedCraftIndex] : undefined;
        }
        return undefined;
    }

    draw(ctx) {
        let selectedCraft = this.getSelectedCraft();
        if (!this.placeMode) {
            ctx.drawImage(CRAFT_BACKDROP, 0, 0, CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);

            if (selectedCraft) {
                this.setupCraftOptions(selectedCraft);

                if (selectedCraft.image && selectedCraft.image.complete) {
                    ctx.drawImage(selectedCraft.image, 0, 0, CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
                }
            }
        } else {
            //draw backdrop
            if (this.userData.playerData.homeBackdrop === 0) {
                ctx.drawImage(HOME_BACKDROP, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            } else {
                ctx.drawImage(HOME_BACKDROP1, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            }
            selectedCraft.placedX = Math.floor(this.currentCanvasMouseLocation.x - CRAFT_CANVAS_WIDTH/2);
            selectedCraft.placedY = Math.floor(this.currentCanvasMouseLocation.y - CRAFT_CANVAS_HEIGHT/2);

            for (let i = 0; i < this.userData.crafts.length; i++) {
                let craft = this.userData.crafts[i];
                if (craft.placedX > -5000 && craft.placedY > -5000) {
                    if (craft.placedY > 180) {
                        ctx.drawImage(craft.image, craft.placedX, craft.placedY);
                    } else {
                        ctx.save();
                        ctx.translate(craft.placedX, craft.placedY);
                        ctx.scale(0.75, 0.75);
                        ctx.drawImage(craft.image, 0, 0);
                        ctx.restore();
                    }
                }
            }
        }
    }
}