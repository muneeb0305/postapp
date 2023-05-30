const errorHandler = ((error, req, res, next) => {
    console.error(error.message);
    if (!error.message) {
        res.status(500).send("Server Error");
    }
    res.status(error.statusCode).send(error.message);
});
module.exports = errorHandler