module.exports.serverError((err, req, res, next) => {
  const { status = 500, message } = err;
  res
    .status(status)
    .json({
      message: status === 500
        ? 'Ошибка сервера'
        : message,
    });
  next(err);
});
