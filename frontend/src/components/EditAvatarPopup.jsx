import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ 
    isOpen, 
    onClose, 
    onUpdateAvatar 
}) {

    const avatarInput = useRef();

    useEffect(() => {
        avatarInput.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarInput.current.value,
        });
    } 

    return (
        <PopupWithForm
            name="avatar"
            className="popup__container_avatar"
            title="Обновить аватар"
            noValidate=""
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        <input
            required=""
            type="url"
            id="userpic-input-avatar"
            name="input-avatar"
            className="popup__input popup__input_type_avatar"
            placeholder="Ссылка на картинку"
            ref={avatarInput}
        />
        <span id="userpic-input-avatar-error" className="popup__input-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;