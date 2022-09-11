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

        this.setupCraftsList();
    }

    setupCraftOptions(craft) {
        let navBar = document.getElementById('navbar');

        if (navBar.children.length < 3) {
            let button = document.createElement("button");
            let text = document.createTextNode( craft.isForSale ? "CHANGE PRICE" : "SELL");
            button.appendChild(text);
            button.id = "sellBtn";
            button.onclick = this.sellCraft;
            navBar.appendChild(button);

            if (craft.isForSale) {
                button = document.createElement("button");
                text = document.createTextNode("REMOVE FROM SALE");
                button.appendChild(text);
                button.id = "sellBtn";
                button.onclick = this.delistCraft;
                navBar.appendChild(button);
            }

            button = document.createElement("button");
            text = document.createTextNode("PLACE");
            button.appendChild(text);
            button.id = "placeBtn";
            button.onclick = this.homeCallback;
            navBar.appendChild(button);

            button = document.createElement("button");
            text = document.createTextNode("DELETE");
            button.appendChild(text);
            button.id = "deleteBtn";
            button.onclick = this.deleteCraft;
            navBar.appendChild(button);
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
                    this.setupMenuOptions();
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
                    selectedCraft.price = 10;
                    this.setupMenuOptions();
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

    setupCraftsList() {
        let menulist = document.getElementById('menulist');
        //menulist.className = 'materialUl';

        while(menulist.firstChild) {
            menulist.removeChild(menulist.firstChild);
        }

        for (let i = 0; i < this.userData.crafts.length; i++) {
            let node = document.createElement("LI");
                node.className = "craftLi";
                let textnode = document.createTextNode(this.userData.crafts[i].name);
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
    }

    getSelectedCraft() {
        //get selected material
        let selectedCrafts = document.getElementsByClassName("selectedCraftLi");
        if (selectedCrafts.length > 0) {
            let selectedCraftIndex = Array.prototype.indexOf.call(selectedCrafts[0].firstChild.parentElement.children, selectedCrafts[0].firstChild);
            return this.userData.crafts[selectedCraftIndex];
        }
        return undefined;
    }

    draw(ctx) {
        let selectedCraft = this.getSelectedCraft();
        ctx.drawImage(CRAFT_BACKDROP, 0, 0, CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);

        if (selectedCraft) {
            this.setupCraftOptions(selectedCraft);

            ctx.drawImage(selectedCraft.data, 0, 0, CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
        }
    }
}