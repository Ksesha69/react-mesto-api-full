export const url = 'http://localhost:3001';

class Auth {
    constructor(setting) {
        this.url = setting.baseUrl;
        this.headers = setting.headers;
    }

    _handleResponse = (res) => {
        if(res.ok) {
            return res.json();
        }
        return res.json().then((err) => {
            err.code = res.message;
            return Promise.reject(err);
        });
    }

    signUp (email, password) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            credentials: 'include',
            mode: "cors",
            headers: this.headers,
            body: JSON.stringify(
                {email, password}
            )
        })
        .then(this._handleResponse)
        .catch((err) => console.log(err));
}

    signIn (data) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            credentials: 'include',
            mode: "cors",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(this._handleResponse)
        .catch((err) => console.log(err));
    }

    signOut() {
        return fetch(`${this.url}/logout`, {
            method: "POST",
            credentials: 'include',
            headers: this.headers,
        }).then((res) => this._handleResponse(res));
    }

    checkToken(token) {
        return fetch(`${this.url}/users/me`, {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => this._handleResponse(res));
}

}

const auth = new Auth({
    baseUrl: url,
    headers: {
        "Content-Type": "application/json",
    },
})

export default auth;