const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const ConflictError = require('../errors/conflictError');
const { OK_200 } = require('../utils/constans');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

module.exports.getUsersId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.send({ data: user });
      else {
        next(new NotFound('Карточка или пользователь не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(OK_200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      }
      if (err.code === 11000) {
        return next(new ConflictError(`Данный ${email} уже существует`));
      }
      return next(err);
    });
};

module.exports.changeUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) res.send(user);
      else {
        next(new NotFound('Карточка или пользователь не найден'));
      }
    })
    .catch((err) => {
      if ((err.name === 'ValidationError')) {
        return next(new BadRequest('Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      }
      return next(err);
    });
};

module.exports.changeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) res.send(user);
      else {
        next(new NotFound('Карточка или пользователь не найден'));
      }
    })
    .catch((err) => {
      if ((err.name === 'ValidationError')) {
        return next(new BadRequest('Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.logout = (req, res, next) => {
  res.clear(jwt).send('Вы вышли')
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь по указанному id не найден.'));
        return;
      }
      res.send(user);
    })
    .catch(next);
};
