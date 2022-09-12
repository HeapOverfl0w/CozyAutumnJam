class Crafts {
    constructor(userData, client, homeCallback) {
        this.userData = userData;
        this.client = client;

        this.placeMode = false;

        this.homeCallback = homeCallback;

        this.visible = false;
    }

    setVisible(isVisible) {
        this.visible = isVisible;

        if (this.visible) {
            this.setupMenuOptions();
            CHANGE_CANVAS_RESOLTUION(CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
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

        this.setupCraftsList(craft);
    }

    setupCraftOptions(craft) {
        let navBar = document.getElementById('navbar');

        if (navBar.children.length < 3) {
            let button = document.createElement("button");
            let text = document.createTextNode( craft.isForSale ? "CHANGE PRICE" : "SELL");
            button.appendChild(text);
            button.id = "sellBtn";
            button.onclick = this.sellCraft.bind(this);
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
        }
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
                    Math.floor(this.currentCanvasMouseLocation.x - CRAFT_CANVAS_WIDTH/2), 
                    Math.floor(this.currentCanvasMouseLocation.y - CRAFT_CANVAS_HEIGHT/2))
                    .then(() => {
                        selectedCraft.placedX = Math.floor(this.currentCanvasMouseLocation.x - CRAFT_CANVAS_WIDTH/2);
                        selectedCraft.placedY = Math.floor(this.currentCanvasMouseLocation.y - CRAFT_CANVAS_HEIGHT/2);

                        CHANGE_CANVAS_RESOLTUION(CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
                        this.setupMenuOptions(selectedCraft);
                        this.setupCraftOptions(selectedCraft);
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
                .then(() => {
                    selectedCraft.placedX = -5000;
                    selectedCraft.placedY = -5000;
                    this.setupMenuOptions(selectedCraft);
                    this.setupCraftOptions(selectedCraft);
                });
        }
    }

    delistCraft() {
        let selectedCraft = this.getSelectedCraft();
        //TODO GET PRICE INPUT
        if (selectedCraft) {
            this.client.toggleCraftForSale(selectedCraft)
                .then(() => {
                    selectedCraft.isForSale = false;
                    selectedCraft.price = 0;
                    this.setupMenuOptions(selectedCraft);
                    this.setupCraftOptions(selectedCraft);
                });
        }
    }

    sellCraft() {
        let selectedCraft = this.getSelectedCraft();
        //TODO GET PRICE INPUT
        if (selectedCraft) {
            this.client.toggleCraftForSale(selectedCraft, 10)
                .then(() => {
                    selectedCraft.isForSale = true;
                    selectedCraft.price = 10;
                    this.setupMenuOptions(selectedCraft);
                    this.setupCraftOptions(selectedCraft);
                });
        }
    }

    deleteCraft() {
        let selectedCraft = this.getSelectedCraft();
        if (selectedCraft) {
            this.client.deleteCraft(selectedCraft)
                .then(() => {
                    this.userData.crafts.splice(this.userData.crafts.indexOf(selectedCraft), 1);
                    this.setupMenuOptions();
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
            ctx.drawImage(HOME_BACKDROP, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            selectedCraft.placedX = Math.floor(this.currentCanvasMouseLocation.x - CRAFT_CANVAS_WIDTH/2);
            selectedCraft.placedY = Math.floor(this.currentCanvasMouseLocation.y - CRAFT_CANVAS_HEIGHT/2);

            for (let i = 0; i < this.userData.crafts.length; i++) {
                let craft = this.userData.crafts[i];
                if (craft.placedX > -5000 && craft.placedY > -5000) {
                    ctx.drawImage(craft.image, craft.placedX, craft.placedY);
                }
            }
        }
    }
}