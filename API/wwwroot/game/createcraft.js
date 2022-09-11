class CreateCraft {
    constructor(userData, client, homeCallback) {
        this.userData = userData;
        this.client = client;
        this.homeCallback = homeCallback;

        this.materials = [];
        this.placedMaterials = [];

        this.currentRotation = 0;
        this.currentCanvasMouseLocation = new Vector2D(300,300);

        this.visible = false;
    }

    setVisible(isVisible) {
        this.visible = isVisible;

        if (this.visible) {
            this.placedMaterials = [];
            this.createMaterialsModel();
            this.setMenuOptions();
            CHANGE_CANVAS_RESOLTUION(CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
        }
    }

    createMaterialsModel() {
        for (const [key, value] of Object.entries(this.userData.playerData.materials)) {
            if (value > 0) {
                const materialName = key.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
                let material = {
                    name : materialName,
                    count: value,
                    key: key
                };

                this.materials.push(material);
            }          
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

        this.setupMaterialsList();
    }

    setupFinishButton() {
        if (navBar.children.length == 1) {
            let navBar = document.getElementById('navbar');
            let button = document.createElement("button");
            let text = document.createTextNode("FINISH");
            button.appendChild(text);
            button.id = "finishBtn";
            button.onclick = this.submitCraft;
            navBar.appendChild(button);
        }
    }

    submitCraft() {
        let materialsUsed = {};
        for(let i = 0; i < this.placedMaterials.length; i++) {
            if (materialsUsed[this.placedMaterials[i].key]) {
                materialsUsed[this.placedMaterials[i].key]++;
            } else {
                materialsUsed[this.placedMaterials[i].key] = 1;
            }
        }
        let canvas = document.getElementById('scene');
        let context = canvas.getContext("2d");
        this.draw(context, true);
        this.client.createCraft("TODO", canvas.toDataURL(), materialsUsed)
            .then(response => response.json())
            .then(craft => {
                this.playerData.crafts.unshift(craft);
                //TODO: change this to switch to crafts
                this.homeCallback();
            });
    }

    setupMaterialsList() {
        let menulist = document.getElementById('menulist');

        while(menulist.firstChild) {
            menulist.removeChild(navBar.firstChild);
        }

        for (let i = 0; i < this.materials.length; i++) {
            let node = document.createElement("LI");
            node.className = "materialLi";
            let textnode = document.createTextNode(materialName + " x" + value);
            node.onclick = function(){
                this.className = "selectedMaterialLi";
            }
            node.appendChild(textnode);
            menulist.appendChild(node);
        }
    }

    getSelectedMaterial() {
        //get selected material
        let selectedMaterials = document.getElementsByClassName("selectedMaterialLi")
        if (selectedMaterials.length > 0) {
            let selectedMaterialName = selectedMaterials.firstChild.nodeValue;
            return this.materials.find(m => m.name === selectedMaterialName);
        }
        return undefined;
    }

    onKeyDown(keyCode) {
        if (keyCode == 82) {
            this.currentRotation += Math.PI / 90;
        }
        if (keyCode == 69) {
            this.currentRotation -= Math.PI / 90;
        }
    }

    onMouseOver(mouseLocation) {
        this.currentCanvasMouseLocation = mouseLocation;
    }

    onMouseClick(mouseLocation) {
        let selectedMaterial = this.getSelectedMaterial();
        if (selectedMaterial) {
            this.placedMaterials.push({
                name : selectedMaterial.name,
                key : selectedMaterial.key,
                location : mouseLocation,
                rotation : this.currentRotation
            });
            selectedMaterial.count--;
            this.currentRotation = 0;

            this.setupMaterialsList();

            this.setupFinishButton();
        }
    }

    draw(ctx, removeBackdrop = false) {
        if (this.visible) {
            let selectedMaterial = this.getSelectedMaterial();
            //draw backdrop
            if (removeBackdrop) {
                ctx.clearRect(0, 0, CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
            } else {
                ctx.drawImage(CRAFT_BACKDROP, 0, 0, CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
            }
            //draw selected material at cursor
            if (selectedMaterial && this.currentCanvasMouseLocation) {
                let selectedSprite = MATERIAL_SPRITES[selectedMaterial.key];
                ctx.save();
                ctx.translate(this.currentCanvasMouseLocation.x - selectedSprite.width/2,
                              this.currentCanvasMouseLocation.y - selectedSprite.height/2);
                ctx.rotate(this.currentRotation);
                ctx.drawImage(selectedSprite, 
                    this.currentCanvasMouseLocation.x - selectedSprite.width/2, 
                    this.currentCanvasMouseLocation.y - selectedSprite.height/2);
                ctx.restore();
            }

            for (let i = 0; i < this.placedMaterials.length; i++) {
                let material = this.placedMaterials[i];
                let sprite = MATERIAL_SPRITES[material];
                ctx.save();
                ctx.translate(this.material.location.x - sprite.width/2,
                              this.material.location.y - sprite.height/2);
                ctx.rotate(material.rotation);
                ctx.drawImage(sprite, 
                    this.material.x, 
                    this.material.y);
                ctx.restore();
            }
        }
    }
}