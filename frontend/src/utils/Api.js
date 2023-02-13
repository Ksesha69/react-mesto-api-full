import { url } from "./constans";

class Api {
    constructor(setting) {
        this.url = setting.baseUrl;
        this.headers = setting.headers;
    }

    _handleResponse = (res) => {
        if(res.ok) {
            return res.json();
        }
        return res.json().then((err) => {
            err.code = res.status;
            return Promise.reject(err);
        });
    }

    getInitialCard(token) {
        return fetch(`${this.url}/cards`, {
            method: "GET",
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse);
    }

    getUserInfo(token) { 
        return fetch(`${this.url}/users/me`, { 
            method: "GET", 
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(this._handleResponse);
    }

    setUserInfo(data, token) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
                body: JSON.stringify(data)
        })
        .then(this._handleResponse);
    }

    addNewCard(data, token) {
        return fetch(`${this.url}/cards`, {
            method: "POST",
            credentials: 'include',
            headers: {Authorization: 
                `Bearer ${token}`,
                'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
            })
        })
        .then(this._handleResponse);
    }

    addNewAvatar(avatar, token) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
                body: JSON.stringify(avatar)
        })
        .then(this._handleResponse);
    }

    deleteCard(id, isOwn, token) {
        return fetch(`${this.url}/cards/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
        })
    .then(this._handleResponse);
    }

    toggleLike(id, isLiked, token) {
        return fetch(`${this.url}/cards/${id}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
        })
    .then(this._handleResponse)
    };
}

const api = new Api({
    baseUrl: url,
    headers: {
        "Content-Type": "application/json", 
        
    }
})

export default api;