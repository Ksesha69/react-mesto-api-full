import React from "react";
import ok from '../images/ok.svg';
import err from '../images/err.svg';

function InfoTooltip({isOpen, onClose, requestFailed}) {


    const textOk = "Вы успешно зарегистрировались!";
    const textErr = "Что-то пошло не так! Попробуйте ещё раз.";

    return (
        
        <div className={`popup ${isOpen && "popup_opened" }`}>
            <div className="popup__container">
                <button 
                        type="button" 
                        className="button popup__close-button" 
                        onClick={onClose}
                />
                <img src={!requestFailed ? ok : err} 
                alt=""
                className="autorization__image"
                />
                <h2 className="autorization__title">
                {!requestFailed ? textOk : textErr}
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;