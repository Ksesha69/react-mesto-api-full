import React from "react";

function ImagePopup ({ card, isOpen, onClose }) {


    return (
        <div className={`popup popup-bigPhoto ${isOpen ? "popup_opened" : ''}`}>
            <div className="popup__container-photo">
                <button
                    type="button"
                    className="button button_close-photo popup__close-button"
                    onClick={onClose}
                />
                
                <img 
                src = {card.link} 
                alt = {card.name}
                className="popup__image"
                />
                <h2 className="popup__text">{card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup; 