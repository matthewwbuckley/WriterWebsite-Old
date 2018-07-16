function errorHandler(err, req, res) {
  console.log(err);
  return res.status(err.status || 500).json({
    error: {
      message: err.message || 'Sorry, there was a problem',
    },
  });
}

module.exports = errorHandler;
