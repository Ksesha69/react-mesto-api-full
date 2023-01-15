import { useState } from "react";
import { Link } from 'react-router-dom';

function Register({ onSubmit }) {
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
                    Регистрация
                </p>
                <form onSubmit={handleSubmit} className="autorization__form">
                    <input
                        required=""
                        type="email"
                        id="register-input-email"
                        name="input-email"
                        className="autorization__input"
                        placeholder="Email"
                        autoComplete="off"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <input
                        required=""
                        type="password"
                        id="register-input-pass"
                        name="input-pass"
                        className="autorization__input"
                        placeholder="Пароль"
                        value={password}
                        onChange={handleChangePass}
                    />
                    <button type="submit" className="button autorization__save-button">
                        Зарегистрироваться
                    </button>
                    <div className="autorization__signup">
                    <p>Уже зарегистрированы?</p>
                    <Link to="/login" className="button signup__link">Войти</Link>
                    </div>
                </form>
            </div>
        )
    }

export default Register;