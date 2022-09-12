class CreateCraft {
    constructor(userData, client, homeCallback, craftsCallback) {
        this.userData = userData;
        this.client = client;
        this.homeCallback = homeCallback;
        this.craftsCallback = craftsCallback;

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
            this.setupModal();
            this.createMaterialsModel();
            this.setupMenuOptions();
            CHANGE_CANVAS_RESOLTUION(CRAFT_CANVAS_WIDTH, CRAFT_CANVAS_HEIGHT);
            HIDE_CHAT_INPUT();
        }
    }

    createMaterialsModel() {
        this.materials = [];
        for (const [key, value] of Object.entries(this.userData.playerData.materials)) {
            if (key != "id" && value > 0) {
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

        HIDE_CRAFT_INFO();
        this.setupMaterialsList();
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
        button.onclick = this.submitCraft.bind(this);
        let modalContents = document.getElementsByClassName("modal-sub-content");

        for (let i = 0; i < modalContents.length; i++) {
            modalContents[i].style.display = "none";
        }            

        let priceInput = document.getElementById("name-input");
        priceInput.style.display = "block";
        document.getElementById("name").value = "MyCraft";
    }

    setupFinishButton() {
        let navBar = document.getElementById('navbar');
        if (navBar.children.length == 1) {
            let navBar = document.getElementById('navbar');
            let button = document.createElement("button");
            let text = document.createTextNode("FINISH");
            button.appendChild(text);
            button.id = "finishBtn";
            button.onclick = this.openModal.bind(this);
            navBar.appendChild(button);
        }
    }

    submitCraft() {
        let name = document.getElementById('name').value;
        if (!name) {
            vt.error("Name must have a value.");
            return;
        }

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
        this.client.createCraft(name, canvas.toDataURL(), materialsUsed)
            .then(response => response.json())
            .then(craft => {
                craft.image = TURN_BASE64_TO_IMAGE(craft.data);
                this.userData.crafts.unshift(craft);
                this.closeModal();
                this.craftsCallback();
            });
    }

    setupMaterialsList() {
        let menulist = document.getElementById('menulist');
        //menulist.className = 'materialUl';

        while(menulist.firstChild) {
            menulist.removeChild(menulist.firstChild);
        }

        for (let i = 0; i < this.materials.length; i++) {
            if (this.materials[i].count > 0) {
                let node = document.createElement("LI");
                node.className = "materialLi";
                let textnode = document.createTextNode(this.materials[i].name + " x" + this.materials[i].count);
                node.onclick = function() {
                    let selectedMaterials = document.getElementsByClassName("selectedMaterialLi");
                    for (let i = 0; i < selectedMaterials.length; i++) {
                        selectedMaterials[i].className = "materialLi";
                    }
                    this.className = "selectedMaterialLi";
                }
                node.appendChild(textnode);
                menulist.appendChild(node);
            }
            
        }
    }

    getSelectedMaterial() {
        //get selected material
        let selectedMaterials = document.getElementsByClassName("selectedMaterialLi");
        if (selectedMaterials.length > 0) {
            let selectedMaterialName = selectedMaterials[0].firstChild.nodeValue.split(" x")[0];
            return this.materials.find(m => m.name === selectedMaterialName);
        }
        return undefined;
    }

    onKeyDown(keyCode) {
        if (keyCode == 82) {
            this.currentRotation += Math.PI / 60;
        }
        if (keyCode == 69) {
            this.currentRotation -= Math.PI / 60;
        }
    }

    onMouseOver(mouseLocation) {
        this.currentCanvasMouseLocation = new Vector2D(Math.floor(mouseLocation.x), Math.floor(mouseLocation.y));
    }

    onMouseClick(mouseLocation) {
        let selectedMaterial = this.getSelectedMaterial();
        if (selectedMaterial) {
            //let selectedSprite = MATERIAL_SPRITES[selectedMaterial.key];
            this.placedMaterials.push({
                name : selectedMaterial.name,
                key : selectedMaterial.key,
                location : new Vector2D(Math.floor(mouseLocation.x), Math.floor(mouseLocation.y)),
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
            for (let i = 0; i < this.placedMaterials.length; i++) {
                let material = this.placedMaterials[i];
                let sprite = MATERIAL_SPRITES[material.key];
                ctx.save();
                ctx.translate(material.location.x,
                              material.location.y);
                ctx.rotate(material.rotation);
                ctx.drawImage(sprite, 
                    Math.floor(-1 * sprite.width/2), 
                    Math.floor(-1 * sprite.height/2));
                ctx.restore();
            }

            //draw selected material at cursor
            if (selectedMaterial && this.currentCanvasMouseLocation) {
                let selectedSprite = MATERIAL_SPRITES[selectedMaterial.key];
                ctx.save();
                ctx.translate(this.currentCanvasMouseLocation.x,
                              this.currentCanvasMouseLocation.y);
                ctx.rotate(this.currentRotation);
                ctx.drawImage(selectedSprite, 
                    Math.floor(-1 * selectedSprite.width/2), 
                    Math.floor(-1 * selectedSprite.height/2), 
                    selectedSprite.width, selectedSprite.height);
                ctx.restore();
            }
        }
    }
}