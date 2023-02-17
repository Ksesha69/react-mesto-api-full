const notFound = require('../errors/notFound');

module.exports.notFound = (req, res, next) => {
  next(notFound('Запрашиваемый ресурс не найден'));
};
