const Card = require('../models/card');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const ForbiddenError = require('../errors/ForbiddenError');
const { OK_200 } = require('../utils/constans');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => res.status(OK_200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findById({ _id: req.params.cardId })
    .then((user) => {
      if (!user) {
        throw new NotFound('Карточка или пользователь не найден');
      }
      if (user.owner.toString() !== userId) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      Card.findByIdAndDelete({ _id: req.params.cardId })
        .then(() => {
          res.send({ message: 'Карточка удалена' });
        }).catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) res.send(card);
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

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) res.send(card);
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
