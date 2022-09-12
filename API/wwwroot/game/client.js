class Client {
    constructor(identity) {
        this.identity = identity;
    }

    createHeaders() {
        let headers = {};
        headers['Content-Type'] = 'application/json';

        if (this.identity && this.identity.token) {
            headers['Authorization'] = 'Bearer ' + this.identity.token;
        } 

        return headers;
    }

    sendChat(message) {
        fetch(BASE_URL + '/api/chat/send?text='+message, {
            method: 'GET',
            headers: this.createHeaders()
        })
        .catch(error => {
            console.error(error);
            vt.error(error.message);
        });
    }

    retrieveChat(lastMessage) {
        return fetch(BASE_URL + '/api/chat/retrieve?lastText='+lastMessage, {
            method: 'GET',
            headers: this.createHeaders()
        })
        .catch(error => {
            console.error(error);
            vt.error(error.message);
        });
    }

    getPlayerData(userName = undefined) {
        let url = BASE_URL + '/api/game/data';
        if (userName) {
            url += `?userName=${userName}`;
        }

        return fetch(url, {
            method: 'GET',
            headers: this.createHeaders()
        })
        .catch(error => {
            console.error(error);
            vt.error(error.message);
        });
    }

    buyCraft(craft) {
        return fetch(BASE_URL + `/api/game/buy?craft=${craft.id}`,{
            method: 'PUT',
            headers: this.createHeaders()
        })
        .catch(error => {
            console.error(error);
            vt.error(error.message);
        });
    }

    getCraftBuyList(page = 0) {
        return fetch(BASE_URL + `/api/game/buylist?page=${page}`,{
            method: 'GET',
            headers: this.createHeaders()
        })
        .catch(error => {
            console.error(error);
            vt.error(error.message);
        });
    }

    toggleCraftForSale(craft, price = 0) {
        return fetch(BASE_URL + `/api/game/toggleForSell?craft=${craft.id}&price=${price}`, {
            method: 'PUT',
            headers: this.createHeaders()
        })
        .catch(error => {
            console.error(error);
            vt.error(error.message);
        });
    }

    placeCraft(craft, x, y) {
        return fetch(BASE_URL + `/api/game/place?craft=${craft.id}&x=${x}&y=${y}`,{
            method: 'PUT',
            headers: this.createHeaders()
        })
        .catch(error => {
            console.error(error);
            vt.error(error.message);
        });
    }

    deleteCraft(craft) {
        return fetch(BASE_URL + `/api/game/delete?craft=${craft.id}`,{
            method: 'PUT',
            headers: this.createHeaders()
        })
        .catch(error => {
            console.error(error);
            vt.error(error.message);
        });
    }

    searchWoods() {
        return fetch(BASE_URL + '/api/game/search', {
            method: 'PUT',
            headers: this.createHeaders()
        })
        .catch(error => {
            console.error(error);
            vt.error(error.message);
        });
    }

    createCraft(name, base64Data, materials) {
        return fetch(BASE_URL + '/api/game/craft', {
            method: 'POST',
            headers: this.createHeaders(),
            body: JSON.stringify({
                name: name,
                data: base64Data,
                materials: materials
            })
        })
        .catch(error => {
            console.error(error);
            vt.error(error.message);
        });
    }
}