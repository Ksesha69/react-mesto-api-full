import { useState } from "react";

function Login({ onSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePass(e) {
        setPassword(e.target.value);
    }

    const handleSubmit = (evt) => {
        onSubmit(evt, { email, password });
    };

        return(
            <div className="autorization">
                <p className="autorization__welcome">
                    Вход
                </p>
                <form onSubmit={handleSubmit} className="autorization__form">
                    <input
                        required=""
                        type="email"
                        id="login-input-email"
                        name="input-email"
                        className="autorization__input autorization__input_type_email"
                        placeholder="Email"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <input
                        required=""
                        type="password"
                        id="login-input-pass"
                        name="input-pass"
                        className="autorization__input autorization__input_type_pass"
                        placeholder="Пароль"
                        value={password}
                        onChange={handleChangePass}
                    />
                    <button type="submit" className="button autorization__save-button">
                        Войти
                    </button>
                </form>
            </div>
        )
    }

export default Login;