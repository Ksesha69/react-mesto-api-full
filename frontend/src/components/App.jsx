import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/Auth';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [userAuth, setUserAuth] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [requestFailed, setRequestFailed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData);
  })
  .catch(err => {
    console.log(err);
  });
    api.getInitialCard()
    .then((card) => {
      setCards(card); 
      console.log(card);
      navigate('/')
    })
    .catch(err => {
        console.log(err);
    });
},[navigate]);

  function handleUpdateUser(data) {
    api.setUserInfo(data)
    .then((usr) => {
      setCurrentUser(usr);
      closeAllPopups();
  })
    .catch(err => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(avatar) {
    api.addNewAvatar(avatar)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch(err => {
        console.log(err);
    })
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
  });
  }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.toggleLike(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err);
      });
    } 

    function handleCardDelete(card) {
        const isOwn = card.owner._id === currentUser._id;
        api.deleteCard(card._id, !isOwn)
        .then(setCards((state) => state.filter((f) => f._id !== card._id)))
        .catch(err => {
          console.log(err);
      });
    }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick({name, link}) {
    setSelectedCard({name, link});
    setImagePopupOpen(true);
  }

  useEffect(() => {
    auth
      .checkToken()
      .then((data) => {
        if(data) {
        setUserAuth(true)
        setCurrentUser(data)
        setUserEmail(data.email)
        navigate('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [navigate, userAuth])

  function handleRegistration(e, {email, password}) {
    e.preventDefault();
    auth.signUp(email, password)
    .then((res) => {
      if (res) {
      navigate('/login');
      setRequestFailed(false);
      setInfoTooltipOpen(true);
      }
      else {
        setInfoTooltipOpen(true);
        setRequestFailed(true);
      }
    })
    .catch(() => {
      setRequestFailed(false);
      setInfoTooltipOpen(true);
    });
  }

  function handleLogin(e, { email, password }) {
    e.preventDefault();
    auth
    .signIn({email, password})
    .then((res) => {
      navigate('/');
      setUserAuth(true);
      setUserEmail(email);
    })
    .catch((err) => {
      setRequestFailed(true);
      setInfoTooltipOpen(true);
      console.log(err);
    });
  }

  const signOut = (() => {
    auth.signOut();
    navigate('/login');
    setUserEmail('');
    setUserAuth(false);
  })

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
      <>
        <div className="page">
          <Header
          loggedIn={userAuth}
          userEmail={userEmail}
          handleLogout={signOut}
          />
          <Routes>
            <Route
            path="/"
            exact
            element={
              <ProtectedRoute loggedIn={userAuth}>
          <Main 
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onHandleCardClick = {handleCardClick}
            cards = {cards}
            handleCardLike = {handleCardLike}
            handleCardDelete = {handleCardDelete}
          />
          </ProtectedRoute>
            }
            />
          <Route
            path="*"
            exact
            element={
              userAuth ? <Navigate to="/" /> : <Navigate to="/login" />
            }
          />
          <Route 
          exact 
          path="/register" 
          element={<Register onSubmit={handleRegistration} />
          } 
          />
          <Route 
          exact 
          path="/login" 
          element={<Login onSubmit={handleLogin} />} />

          </Routes>
          {userAuth && <Footer />}
        </div>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}

        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <InfoTooltip 
          isOpen={isInfoTooltipOpen} 
          onClose={closeAllPopups} 
          requestFailed={requestFailed}
        />
        </>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
