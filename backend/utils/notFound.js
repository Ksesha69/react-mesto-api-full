const NotFound = require('../errors/notFound');

module.exports.notFound = (req, res, next) => next(new NotFound('Запрашиваемый не найден'));
