import React from "react";
function PopupWithForm({
    name,
    title,
    onClose,
    isOpen,
    children,
    buttonText,
    onSubmit,
})
{
    return (
        <div className={`popup popup-${name} ` + (isOpen && "popup_opened" )}>
            <div className="popup__container">
                <form
                    name={`${name}-form`}
                    className={`popup__form popup-${name}_form`}
                    noValidate
                    onSubmit={onSubmit}
                >
                    <button 
                        type="button" 
                        className="button popup__close-button" 
                        onClick={onClose}
                    />
                    <h2 className="popup__header">{title}</h2>
                    {children}
                    <button type="submit" className="button popup__save-button">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;