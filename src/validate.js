module.exports = (req, res) => {
    return res.send(req.query['hub.challenge'])
}