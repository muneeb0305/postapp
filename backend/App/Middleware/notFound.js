const notFound = (req, res) => {
    res.status(404).send('API not Found')
}
module.exports = notFound