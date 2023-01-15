import React, { useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({     
    isOpen, 
    onClose, 
    onUpdateUser 
}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    } 

    const currentUser = useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            noValidate=""
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        <input
            type="text"
            id="profile-input-name"
            required=""
            minLength={2}
            maxLength={40}
            name="input-name"
            className="popup__input popup__input_type_name"
            value={name || ""}
            onChange={handleChangeName}
        />
        <span id="profile-input-name-error" className="popup__input-error" />
        <input
            type="text"
            id="profile-input-about"
            required=""
            minLength={2}
            maxLength={200}
            name="input-job"
            className="popup__input popup__input_type_job"
            value={description || ""}
            onChange={handleChangeDescription}
        />
        <span id="profile-input-about-error" className="popup__input-error" />
        </PopupWithForm>
    )
}


export default EditProfilePopup;