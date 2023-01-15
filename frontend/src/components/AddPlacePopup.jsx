import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ 
    isOpen, 
    onClose, 
    onAddPlace  
}) {
    const titleRef = useRef();
    const imageRef = useRef();

    useEffect(() => {
        titleRef.current.value = "";
        imageRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: titleRef.current.value,
            link: imageRef.current.value,
        });
    } 

    return (
        <PopupWithForm
        name="photo" 
        title="Новое место"
        noValidate=""
        buttonText="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
            <input
                required=""
                type="text"
                minLength={2}
                id="picture-input-name"
                name="input-photo"
                className="popup__input popup__input_type_photo"
                placeholder="Название"
                ref={titleRef}
            />
            <span id="picture-input-name-error" className="popup__input-error" />
            <input
                required=""
                type="url"
                id="picture-input-link"
                name="input-title"
                className="popup__input popup__input_type_title"
                placeholder="Ссылка на картинку"
                ref={imageRef}
            />
            <span id="picture-input-link-error" className="popup__input-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;