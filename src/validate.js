module.exports = (req, res) => {
    return res.send(res.query['hub.challenge'])
}