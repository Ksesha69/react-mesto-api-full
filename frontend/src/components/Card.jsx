import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
    card, 
    onCardClick, 
    onCardLike, 
    onCardDelete 
}) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `button button__delete ${isOwn ? '' : "button__delete_hidden"}`
    ); 

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `button elements__like ${isLiked && 'elements__like_active'}`);
    
    const handleClick = () => {
        onCardClick(card);
    } 

    function handleLikeClick() {
        onCardLike(card);
    }
    
    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="elements__item">
            <button 
            type="button" 
            className="button__image">
                <img 
                className="elements__image" 
                src={card.link}
                alt={card.name}
                onClick={handleClick}
                />
            </button>
            <button 
            type="button" 
            className={cardDeleteButtonClassName} 
            onClick={handleDeleteClick}
            />
            <div className="elements__table">
                <h2 className="elements__text">{card.name}</h2>
                <div className="elements__container">
                    <button
                        type="button" 
                        className={cardLikeButtonClassName} 
                        onClick={handleLikeClick}
                    />
                    <h4 className="elements__like_amount">{card.likes.length}</h4>
                </div>
            </div>
        </div>
    )
}

export default Card;